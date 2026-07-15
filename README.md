<div align="center">

# 📦 FulfillMesh
### AI-Powered Fulfillment & Last-Mile Optimization Engine

*Eliminating cost leakage in retail supply chains through real-time, graph-based decision intelligence — now with a natural-language query layer powered by Claude.*

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat&logo=python&logoColor=white)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Flask](https://img.shields.io/badge/Flask-API-000000?style=flat&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![NetworkX](https://img.shields.io/badge/NetworkX-graph--engine-orange?style=flat)](https://networkx.org/)
[![Claude API](https://img.shields.io/badge/Claude-API-D97757?style=flat)](https://www.anthropic.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](#-license)
[![Status](https://img.shields.io/badge/Status-Prototype-yellow.svg)](#)

[Problem](#-problem-statement) · [Solution](#-solution) · [AI Query Layer](#-ai-driven-natural-language-query-layer) · [Architecture](#-architecture) · [Getting Started](#-getting-started) · [API Reference](#-api-reference)

</div>

## 🚀 Overview

**FulfillMesh** is an AI-powered decision engine designed to eliminate inefficiencies, fragmentation, and cost leakage within large-scale retail supply chains — with a specific focus on **last-mile delivery**, **return bundling**, and **dynamic fulfillment node selection**.

Despite significant investments by major retailers in supply chain platforms (e.g., Walmart's Eden, Spark, and Luminate), critical gaps still persist in real-time decision-making across fulfillment networks. FulfillMesh is built as a proof-of-concept to bridge those gaps using real-time intelligence, graph optimization, demand-aware routing, and — more recently — LLM-powered natural language interfaces on top of the existing optimization pipeline.

This project was built as a case study against Walmart's retail supply chain, but the underlying engine is retailer-agnostic and generalizes to any multi-node fulfillment network.

## 🎥 Demo

<div align="center">

**▶️ [Watch the full walkthrough](https://youtu.be/q6AUIC6gOYQ)**

</div>

## 🔍 Problem Statement

Retail supply chains at scale suffer from three compounding inefficiencies:

| # | Problem | Root Cause | Business Impact |
|---|---------|-----------|------------------|
| 1 | 🏪 **Inefficient Fulfillment Node Selection** | Nodes are selected using static proximity rules, without accounting for real-time cost-effectiveness or demand | Higher cost-per-order, suboptimal SLA adherence |
| 2 | 🔁 **Fragmented Return & Delivery Routes** | Returns and deliveries run as separate logistical flows | Redundant routes, higher fuel usage, underutilized vehicles |
| 3 | 📊 **Isolated Demand Planning** | Forecasts are disconnected from real-time inventory movement and routing | Overstocking at low-demand nodes, understocking at high-demand nodes |

**Net effect:** increased cost per order, duplicate delivery/return trips, poor driver utilization, and operational overhead amounting to millions annually at scale.

## 💡 Solution

FulfillMesh proposes a unified, AI-driven fulfillment layer that:

- **Optimizes Fulfillment Node Selection** using dynamic cost-efficiency scoring and real-time stock-demand matching, rather than static distance rules
- **Bundles Deliveries and Returns** on shared routes to minimize redundant trips and improve vehicle utilization
- **Implements Demand-Aware Inventory Routing** by fusing live demand signals with local inventory positioning
- **Exposes the entire pipeline through natural language**, so a plain-English order request is automatically translated into the structured parameters the optimization engine needs — no manual SKU lookups or coordinate entry required

The system is modeled as a **weighted, dynamic graph** where nodes represent fulfillment centers/dark stores and edges represent route cost (distance, fuel, time, vehicle capacity). A real-time optimization layer re-scores this graph as demand, inventory, and traffic signals change.

## 🤖 AI-Driven Natural Language Query Layer

The newest addition to FulfillMesh: an LLM-powered interface built on **Claude's tool-use API** that sits directly in front of the existing fulfillment cost/surge prediction pipeline.

**What it does:**
- Accepts free-text order requests, e.g. *"I need 2 wireless mice delivered near Andheri, Mumbai"*
- Uses Claude's structured tool-use to extract `product_names` and `delivery_area` from the raw text — no keyword matching or manual parsing
- Resolves product names to real SKU IDs via the existing product/category mapping layer
- Geocodes the delivery area to coordinates
- Feeds everything directly into the existing `evaluate_combos()` XGBoost cost/surge model pipeline
- Returns the top 3 fulfillment node combinations with cost and SKU breakdowns

**Why it matters:** this isn't a bolt-on chatbot — it's a real integration that lets a non-technical user (or another internal service) interact with the same production optimization pipeline through plain language, closing the gap between "AI-assisted developer workflows" and "AI-powered product features."

**Endpoint:**
```
POST /nl_query
Content-Type: application/json

{
  "query": "I need 2 wireless mice delivered near Andheri, Mumbai"
}
```

**Response:**
```json
{
  "status": "success",
  "parsed_query": {
    "requested_skus": [10293],
    "unresolved_products": [],
    "delivery_area": "Andheri, Mumbai",
    "latitude": 19.1197,
    "longitude": 72.8468
  },
  "top_combinations": [
    {
      "nodes": ["NODE-BOM-02"],
      "total_cost": 42.7,
      "sku_mapping": { "NODE-BOM-02": [10293] }
    }
  ]
}
```

## 🧠 Key Features

- 📦 **Smart Fulfillment Node Selection** — real-time cost/demand-aware ranking instead of static nearest-node logic
- 🔁 **AI-Driven Delivery & Return Route Bundling** — merges return pickups with delivery routes to cut redundant trips
- 📊 **Demand-Aware Local Inventory Movement** — links forecasted demand to inventory rebalancing decisions
- 🗣️ **Natural Language Order Interface** — Claude-powered tool-use layer that turns free text into structured, model-ready input
- ⚙️ **Real-Time Optimization Engine** — recomputes optimal routes/nodes as conditions change
- 💰 **Cost Simulation Dashboard** — visualizes per-order cost savings against baseline static routing
- 🌐 **REST API** — exposes optimization and NL-query endpoints for integration with external systems

## 🏗️ Architecture

```
┌──────────────────────┐        ┌────────────────────────┐        ┌────────────────────────┐
│   React.js Frontend  │  HTTP  │      Flask API         │        │   Optimization Engine   │
│  (Simulation & UI)   │◄──────►│  (app.py, /nl_query)   │◄──────►│  (XGBoost cost/surge,  │
└──────────────────────┘  JSON  └────────────────────────┘        │   NetworkX graph model) │
                                            │                     └────────────────────────┘
                                            ▼                                  │
                                 ┌────────────────────────┐                    ▼
                                 │   Claude Tool-Use Layer │        ┌───────────────────────┐
                                 │  (nl_order_query.py)    │        │  Inventory & Demand    │
                                 │  NL text → structured    │       │  Data Store            │
                                 │  SKUs + location         │       └───────────────────────┘
                                 └────────────────────────┘
```

**Flow:** the frontend (or a plain-text request) submits an order → if natural language, the Claude tool-use layer extracts structured SKUs and delivery coordinates first → the API layer forwards structured data to the optimization engine → the engine scores fulfillment nodes using the trained cost/surge models → results are returned for visualization or direct API consumption.

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Core Engine | **Python 3.10+** | Simulation logic, optimization algorithms |
| Data Processing | **Pandas, NumPy** | Demand signal processing, data modeling |
| ML Models | **XGBoost** | Fulfillment cost and surge prediction |
| Graph Optimization | **NetworkX** | Node graph construction, shortest-path/route optimization |
| AI / NLP | **Anthropic Claude API (tool use)** | Natural language → structured query extraction |
| Geocoding | **Geopy** | Delivery area → coordinates resolution |
| Backend API | **Flask** | REST endpoints for the optimization engine and NL query layer |
| Frontend | **React.js** | Interactive simulation & visualization UI |
| Tooling | **npm, pip** | Dependency & environment management |

## 📁 Project Structure

```
FulfillMesh/
├── backend/
│   ├── app.py                  # Flask API entry point
│   ├── nl_order_query.py       # Claude tool-use NL query layer (new)
│   ├── model_utils.py          # Data prep, XGBoost training, combo evaluation
│   ├── product_mapping_utils.py# Category/product/SKU mapping
│   ├── demand_model.pkl        # Trained demand forecasting model
│   ├── demand_encoder.pkl      # Encoder for demand model inputs
│   ├── historical_training_data.csv
│   ├── returns_dataset.csv
│   ├── walmart_dataset_10000_orders.xlsx
│   └── requirements.txt
├── src/                        # React frontend source
├── public/
└── README.md
```

## 🚦 Getting Started

### Prerequisites

| Tool | Minimum Version | Check with |
|------|------------------|------------|
| Python | 3.10+ | `python --version` |
| pip | 22+ | `pip --version` |
| Node.js | 18+ | `node --version` |
| npm | 9+ | `npm --version` |
| Git | any recent | `git --version` |

### 1. Backend Setup

```bash
# 1. Clone the repository
git clone https://github.com/DKarthikeya31/FulfillMesh.git
cd FulfillMesh/backend

# 2. Create and activate a virtual environment
python -m venv venv
source venv/bin/activate        # On Windows: venv\Scripts\activate

# 3. Install Python dependencies
pip install -r requirements.txt

# 4. Set your Anthropic API key (required for the NL query layer)
export ANTHROPIC_API_KEY=your_key_here   # On Windows: set ANTHROPIC_API_KEY=your_key_here

# 5. Run the API server
python app.py
```

The backend will start on **`http://localhost:5000`**.

### 2. Frontend Setup

```bash
# From the project root
cd src

# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev
```

### 3. Verifying the Setup

```bash
# Health check
curl http://localhost:5000/

# Expected response
# {"message": "Walmart Inventory API is running"}

# NL query test
curl -X POST http://localhost:5000/nl_query \
  -H "Content-Type: application/json" \
  -d '{"query": "I need 2 wireless mice delivered near Andheri, Mumbai"}'
```

## 📡 API Reference

| Method | Endpoint | Description |
|--------|----------|--------------|
| `GET` | `/` | Service health check |
| `POST` | `/process_order` | Returns the top fulfillment node combinations for a given SKU list and location |
| `GET` | `/product_mapping` | Returns category → product → SKU mappings |
| `POST` | `/predict_demand` | Returns a demand prediction for given input features |
| `POST` | `/get_nearby_returns` | Returns nearby return items within a given radius |
| `POST` | `/nl_query` | **(New)** Accepts a natural-language order request, extracts structured SKUs/location via Claude, and returns fulfillment recommendations |

## 🧮 Algorithmic Approach

- **Graph Modeling:** Fulfillment nodes and delivery points are modeled as vertices in a weighted graph (`networkx.Graph` / `DiGraph`), with edges weighted by a composite cost function of distance, fuel, current load, and time-to-deliver.
- **Node Selection:** A cost-minimization search ranks candidate nodes in real time using live inventory and demand signals rather than static proximity, backed by trained XGBoost cost and surge models.
- **Route Bundling:** Delivery and return requests within a serviceable radius/time-window are clustered and merged using a greedy/heuristic bundling strategy to minimize total route cost while respecting vehicle capacity constraints.
- **Demand-Aware Routing:** A forecasting layer feeds predicted demand back into the node-scoring function, discouraging over-fulfillment from low-demand nodes.
- **Natural Language Understanding:** Claude's tool-use API extracts structured intent (products + delivery area) from free text, which is then resolved to SKUs and coordinates before being handed to the existing optimization pipeline — keeping the ML pipeline itself unchanged and the LLM layer strictly additive.

## 📈 Impact & Results

| Metric | Baseline (Static Rules) | With FulfillMesh | Improvement |
|--------|--------------------------|-------------------|-------------|
| Logistics cost per order | Baseline | Optimized | **Up to 20% reduction** |
| Redundant delivery/return trips | High | Consolidated | Significant reduction |
| Vehicle utilization | Low–Moderate | Improved | Higher load factor per trip |
| Stock-demand alignment | Disconnected | Synced | Reduced overstocking |

> Figures above are based on simulated scenarios in this prototype and are intended to demonstrate directional impact, not audited production metrics.

## 🗺️ Roadmap

- [ ] Replace heuristic bundling with a proper VRP (Vehicle Routing Problem) solver (e.g., OR-Tools)
- [ ] Integrate live traffic/weather signals into route cost weighting
- [ ] Extend the Claude tool-use layer to support multi-turn clarification (e.g., ambiguous product names)
- [ ] Containerize backend + frontend with Docker Compose
- [ ] Add authentication and multi-tenant support for the API
- [ ] CI/CD pipeline with automated tests on PRs

## 🤝 Contributing

Contributions are welcome. To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please open an issue first to discuss significant changes.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 📬 Contact

**Author:** Dasari Karthikeya
**Demo Video:** [https://youtu.be/q6AUIC6gOYQ](https://youtu.be/q6AUIC6gOYQ)

---

<div align="center">

If this project helped you, consider giving it a ⭐ on GitHub!

</div>
