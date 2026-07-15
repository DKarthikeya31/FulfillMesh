import os
import json
from typing import List, Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import anthropic

router = APIRouter(prefix="/route", tags=["nl-routing"])

client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

ROUTE_TOOL = {
    "name": "extract_route_query",
    "description": (
        "Extract structured routing parameters from a user's natural "
        "language request about fulfillment routing. Use this whenever "
        "the user describes a start point, end point, or nodes to avoid."
    ),
    "input_schema": {
        "type": "object",
        "properties": {
            "start_node": {
                "type": "string",
                "description": "The origin node/warehouse ID or name mentioned by the user.",
            },
            "end_node": {
                "type": "string",
                "description": "The destination node ID or name mentioned by the user.",
            },
            "avoid_nodes": {
                "type": "array",
                "items": {"type": "string"},
                "description": "Any node IDs the user explicitly wants to avoid. Empty list if none.",
            },
            "optimize_for": {
                "type": "string",
                "enum": ["cost", "time", "distance"],
                "description": "What the user wants to minimize. Default to 'cost' if unspecified.",
            },
        },
        "required": ["start_node", "end_node"],
    },
}


class NLQueryRequest(BaseModel):
    query: str


class RouteResponse(BaseModel):
    parsed_params: dict
    route_result: dict


def find_optimal_route(start_node: str, end_node: str,
                        avoid_nodes: Optional[List[str]] = None,
                        optimize_for: str = "cost") -> dict:
    """
    Replace this with your real routing engine call, e.g.:
        from model_utils import find_optimal_route as real_route
        return real_route(start_node, end_node, avoid_nodes, optimize_for)
    """
    return {
        "start_node": start_node,
        "end_node": end_node,
        "avoid_nodes": avoid_nodes or [],
        "optimize_for": optimize_for,
        "path": [start_node, "...", end_node],
        "estimated_cost": None,
        "note": "Replace find_optimal_route() with your real routing engine call.",
    }


@router.post("/query", response_model=RouteResponse)
def nl_route_query(request: NLQueryRequest):
    if not request.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty.")

    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        tools=[ROUTE_TOOL],
        tool_choice={"type": "tool", "name": "extract_route_query"},
        messages=[{"role": "user", "content": request.query}],
    )

    tool_use_block = next(
        (block for block in message.content if block.type == "tool_use"),
        None,
    )
    if tool_use_block is None:
        raise HTTPException(
            status_code=422,
            detail="Could not extract routing parameters from the query.",
        )

    params = tool_use_block.input

    route_result = find_optimal_route(
        start_node=params["start_node"],
        end_node=params["end_node"],
        avoid_nodes=params.get("avoid_nodes", []),
        optimize_for=params.get("optimize_for", "cost"),
    )

    return RouteResponse(parsed_params=params, route_result=route_result)


if __name__ == "__main__":
    test_query = "Find the cheapest route from warehouse A to node 12, avoid node 7"
    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        tools=[ROUTE_TOOL],
        tool_choice={"type": "tool", "name": "extract_route_query"},
        messages=[{"role": "user", "content": test_query}],
    )
    tool_use_block = next(b for b in message.content if b.type == "tool_use")
    print(json.dumps(tool_use_block.input, indent=2))
