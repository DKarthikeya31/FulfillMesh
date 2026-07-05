from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from model_utils import (
    load_and_prepare_data,
    train_models,
    evaluate_combos,
    load_model_and_encoder,
    safe_encode_input
)
from product_mapping_utils import load_category_product_data
from geopy.distance import geodesic
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def home():
    return {"message": "Walmart Inventory API is running"}

@app.route('/process_order', methods=['POST'])
def process_order():
    try:
        data = request.json
        requested_skus = data.get('requested_skus', [])
        requested_skus = [int(sku) for sku in requested_skus]
        print("requested_skus (as int)", requested_skus)
        location = data.get('location', {})
        area = location.get('area')
        latitude = location.get('latitude')
        longitude = location.get('longitude')

        inventory_df, order_df, cust_lat, cust_lon = load_and_prepare_data(requested_skus, latitude, longitude)
        xgb_cost_model, xgb_surge_model, encoders = train_models(order_df)

        results = evaluate_combos(
            inventory_df, order_df, requested_skus, cust_lat, cust_lon,
            xgb_cost_model, xgb_surge_model, encoders
        )

        node_to_skus = inventory_df.groupby("node_id")['SKU_id'].apply(set).to_dict()
        top_output = []

        for res in results[:3]:
            combo = res["nodes"]
            cost = res["cost"]
            top_output.append({
                "nodes": list(combo),
                "total_cost": round(cost, 2),
                "sku_mapping": {nid: list(node_to_skus[nid]) for nid in combo}
            })

        return jsonify({"status": "success", "top_combinations": top_output})

    except Exception as e:
        print("❌ Exception occurred in /process_order:", str(e))
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/product_mapping', methods=['GET'])
def product_mapping():
    category_to_products, product_to_sku, product_to_category = load_category_product_data()
    return jsonify({
        'category_to_products': category_to_products,
        'product_to_sku': product_to_sku,
        'product_to_category': product_to_category
    })

@app.route('/predict_demand', methods=['POST'])
def predict_demand():
    try:
        input_data = request.json
        model, encoder = load_model_and_encoder()
        df_encoded = safe_encode_input(input_data, encoder)
        prediction = model.predict(df_encoded)[0]
        return jsonify({"status": "success", "prediction": round(float(prediction), 2)})
    except Exception as e:
        print("❌ Exception in /predict_demand:", str(e))
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/get_nearby_returns', methods=['POST'])
def get_nearby_returns():
    try:
        data = request.json
        customer_lat = data.get('latitude')
        customer_lon = data.get('longitude')
        radius_km = data.get('radius_km', 3)  # Default to 3km if not specified

        # Load returns data
        try:
            returns_df = pd.read_csv('returns_dataset.csv')
            returns_df[['latitude', 'longitude']] = returns_df['location'].str.split(',', expand=True).astype(float)
        except FileNotFoundError:
            return jsonify({"status": "error", "message": "Returns data not found"}), 500

        # Find nearby returns using geodesic
        nearby_returns = []
        center_point = (customer_lat, customer_lon)
        for _, row in returns_df.iterrows():
            return_lat = row['latitude']
            return_lon = row['longitude']
            if pd.isna(return_lat) or pd.isna(return_lon):
                continue
            point = (return_lat, return_lon)
            distance = geodesic(center_point, point).km
            if distance <= radius_km:
                nearby_returns.append({
                    'return_id': row.get('return_id', ''),
                    'latitude': return_lat,
                    'longitude': return_lon,
                    'sku_id': row.get('sku_id', ''),
                    'sku_name': row.get('sku_name', ''),
                    'distance_km': round(distance, 3)
                })

        if nearby_returns:
            return jsonify({
                "status": "success",
                "nearby_returns": sorted(nearby_returns, key=lambda x: x['distance_km'])
            })
        else:
            return jsonify({
                "status": "success",
                "nearby_returns": [],
                "message": "No nearby returns found within 3km"
            })

    except Exception as e:
        print(f"❌ Exception in /get_nearby_returns: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True)