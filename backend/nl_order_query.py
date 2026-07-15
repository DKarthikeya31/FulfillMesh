import os
from flask import Blueprint, request, jsonify
import anthropic
from geopy.geocoders import Nominatim

from model_utils import load_and_prepare_data, train_models, evaluate_combos
from product_mapping_utils import load_category_product_data

nl_order_bp = Blueprint("nl_order", __name__)

client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))
geolocator = Nominatim(user_agent="fulfillmesh-nl-query")

ORDER_TOOL = {
    "name": "extract_order_query",
    "description": (
        "Extract structured order details from a user's natural language "
        "fulfillment request: which products they want and the delivery area."
    ),
    "input_schema": {
        "type": "object",
        "properties": {
            "product_names": {
                "type": "array",
                "items": {"type": "string"},
                "description": "Product names mentioned by the user, as written (e.g. 'wireless mouse')."
            },
            "delivery_area": {
                "type": "string",
                "description": "The delivery location/area mentioned, e.g. 'Andheri, Mumbai'."
            }
        },
        "required": ["product_names", "delivery_area"]
    }
}


def _resolve_skus(product_names):
    """Map free-text product names to SKU IDs using the existing product/category mapping."""
    _, product_to_sku, _ = load_category_product_data()
    resolved, unresolved = [], []
    for name in product_names:
        sku = product_to_sku.get(name)
        if sku is None:
            sku = next((v for k, v in product_to_sku.items() if k.lower() == name.lower()), None)
        if sku is not None:
            resolved.append(int(sku))
        else:
            unresolved.append(name)
    return resolved, unresolved


@nl_order_bp.route("/nl_query", methods=["POST"])
def nl_query():
    body = request.json or {}
    query = body.get("query", "").strip()
    if not query:
        return jsonify({"status": "error", "message": "Query cannot be empty."}), 400

    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        tools=[ORDER_TOOL],
        tool_choice={"type": "tool", "name": "extract_order_query"},
        messages=[{"role": "user", "content": query}],
    )

    tool_use_block = next((b for b in message.content if b.type == "tool_use"), None)
    if tool_use_block is None:
        return jsonify({"status": "error", "message": "Could not parse the request."}), 422

    params = tool_use_block.input
    product_names = params.get("product_names", [])
    delivery_area = params.get("delivery_area", "")

    requested_skus, unresolved = _resolve_skus(product_names)
    if not requested_skus:
        return jsonify({
            "status": "error",
            "message": f"Could not match any requested products to known SKUs: {product_names}"
        }), 422

    location = geolocator.geocode(delivery_area)
    if location is None:
        return jsonify({"status": "error", "message": f"Could not geocode area: {delivery_area}"}), 422

    latitude, longitude = location.latitude, location.longitude

    try:
        inventory_df, order_df, cust_lat, cust_lon = load_and_prepare_data(
            requested_skus, latitude, longitude
        )
        xgb_cost_model, xgb_surge_model, encoders = train_models(order_df)
        results = evaluate_combos(
            inventory_df, order_df, requested_skus, cust_lat, cust_lon,
            xgb_cost_model, xgb_surge_model, encoders
        )

        node_to_skus = inventory_df.groupby("node_id")["SKU_id"].apply(set).to_dict()
        top_output = []
        for res in results[:3]:
            combo = res["nodes"]
            cost = res["cost"]
            top_output.append({
                "nodes": list(combo),
                "total_cost": round(cost, 2),
                "sku_mapping": {nid: list(node_to_skus[nid]) for nid in combo}
            })

        return jsonify({
            "status": "success",
            "parsed_query": {
                "requested_skus": requested_skus,
                "unresolved_products": unresolved,
                "delivery_area": delivery_area,
                "latitude": latitude,
                "longitude": longitude
            },
            "top_combinations": top_output
        })

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
