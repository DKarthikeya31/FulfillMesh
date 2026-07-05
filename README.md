<div align="center">

# 📦 FulfillMesh
### AI-Powered Fulfillment & Last-Mile Optimization Engine

*Eliminating cost leakage in retail supply chains through real-time, graph-based decision intelligence*

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat&logo=python&logoColor=white)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-async-009688?style=flat&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![NetworkX](https://img.shields.io/badge/NetworkX-graph--engine-orange?style=flat)](https://networkx.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](#-license)
[![Status](https://img.shields.io/badge/Status-Prototype-yellow.svg)](#)

[Demo](https://youtu.be/q6AUIC6gOYQ) · [Problem](#-problem-statement) · [Solution](#-solution) · [Architecture](#-architecture) · [Getting Started](#-getting-started) · [API Reference](#-api-reference)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Demo](#-demo)
- [Problem Statement](#-problem-statement)
- [Solution](#-solution)
- [Key Features](#-key-features)
- [Architecture](#-architecture)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#1-backend-setup)
  - [Frontend Setup](#2-frontend-setup)
  - [Environment Variables](#3-environment-variables)
  - [Verifying the Setup](#4-verifying-the-setup)
- [API Reference](#-api-reference)
- [Algorithmic Approach](#-algorithmic-approach)
- [Impact & Results](#-impact--results)
- [Testing](#-testing)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🚀 Overview

**FulfillMesh** is an AI-powered decision engine designed to eliminate inefficiencies, fragmentation, and cost leakage within large-scale retail supply chains — with a specific focus on **last-mile delivery**, **return bundling**, and **dynamic fulfillment node selection**.

Despite significant investments by major retailers in supply chain platforms (e.g., Walmart's Eden, Spark, and Luminate), critical gaps still persist in real-time decision-making across fulfillment networks. FulfillMesh is built as a proof-of-concept to bridge those gaps using real-time intelligence, graph optimization, and demand-aware routing.

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

The system is modeled as a **weighted, dynamic graph** where nodes represent fulfillment centers/dark stores and edges represent route cost (distance, fuel, time, vehicle capacity). A real-time optimization layer re-scores this graph as demand, inventory, and traffic signals change.

## 🧠 Key Features

- 📦 **Smart Fulfillment Node Selection** — real-time cost/demand-aware ranking instead of static nearest-node logic
- 🔁 **AI-Driven Delivery & Return Route Bundling** — merges return pickups with delivery routes to cut redundant trips
- 📊 **Demand-Aware Local Inventory Movement** — links forecasted demand to inventory rebalancing decisions
- ⚙️ **Real-Time Optimization Engine** — recomputes optimal routes/nodes as conditions change
- 💰 **Cost Simulation Dashboard** — visualizes per-order cost savings against baseline static routing
- 🌐 **REST API** — exposes optimization endpoints for integration with external systems

## 🏗️ Architecture

```
┌──────────────────────┐        ┌────────────────────────┐        ┌────────────────────────┐
│   React.js Frontend  │  HTTP  │   FastAPI / Flask API  │        │   Optimization Engine   │
│  (Simulation & UI)   │◄──────►│     (app.py, routes)   │◄──────►│  (NetworkX graph model) │
└──────────────────────┘  JSON  └────────────────────────┘        └────────────────────────┘
                                            │                                  │
                                            ▼                                  ▼
                                 ┌────────────────────┐            ┌───────────────────────┐
                                 │  Demand Forecast    │            │  Inventory & Node      │
                                 │  Module (Pandas)    │            │  State Store           │
                                 └────────────────────┘            └───────────────────────┘
```

**Flow:** the frontend submits an order/return event → the API layer forwards it to the optimization engine → the engine builds/updates a weighted graph of nodes and edges → a cost-aware search returns the optimal fulfillment node and/or bundled route → results are returned to the frontend for visualization.

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Core Engine | **Python 3.10+** | Simulation logic, optimization algorithms |
| Data Processing | **Pandas, NumPy** | Demand signal processing, data modeling |
| Graph Optimization | **NetworkX** | Node graph construction, shortest-path/route optimization |
| Backend API | **FastAPI / Flask** | REST endpoints for the optimization engine |
| Frontend | **React.js** | Interactive simulation & visualization UI |
| Tooling | **npm, pip** | Dependency & environment management |

## 📁 Project Structure

```
FulfillMesh/
├── backend/
│   ├── app.py                # API entry point (Flask/FastAPI)
│   ├── engine/
│   │   ├── node_selector.py  # Fulfillment node scoring & selection
│   │   ├── route_bundler.py  # Delivery + return route bundling logic
│   │   └── demand_model.py   # Demand-aware inventory routing
│   ├── data/                 # Sample nodes, demand, and inventory datasets
│   ├── tests/                # Unit tests for engine modules
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/       # Map view, cost dashboard, route visualizer
│   │   ├── pages/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
├── docs/                     # Architecture notes, diagrams
├── .env.example
└── README.md
```

> **Note:** Adjust this tree to match your actual repository layout before publishing.

## 🚦 Getting Started

### Prerequisites

Make sure the following are installed on your machine:

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
git clone https://github.com/<your-username>/FulfillMesh.git
cd FulfillMesh/backend

# 2. Create and activate a virtual environment
python -m venv venv
source venv/bin/activate        # On Windows: venv\Scripts\activate

# 3. Install Python dependencies
pip install -r requirements.txt

# 4. Run the API server
python app.py
```

The backend will start on **`http://localhost:5000`** (Flask) or **`http://localhost:8000`** (FastAPI/uvicorn), depending on configuration.

If using FastAPI with uvicorn directly:

```bash
uvicorn app:app --reload --port 8000
```

### 2. Frontend Setup

```bash
# From the project root
cd frontend

# 1. Install dependencies
npm install

# 2. Configure the API base URL (see below)
cp .env.example .env

# 3. Run the development server
npm run dev
```

The frontend will be available at **`http://localhost:5173`** (Vite default) or **`http://localhost:3000`** depending on your bundler config.

### 3. Environment Variables

Create a `.env` file in `frontend/` (and `backend/` if applicable):

```bash
# frontend/.env
VITE_API_BASE_URL=http://localhost:8000

# backend/.env
DEBUG=True
DEMAND_DATA_PATH=./data/demand.csv
NODE_DATA_PATH=./data/nodes.csv
```

### 4. Verifying the Setup

```bash
# Health check
curl http://localhost:8000/health

# Expected response
# {"status": "ok", "engine": "FulfillMesh v1.0"}
```

Then open the frontend in your browser and trigger a sample optimization run from the UI to confirm end-to-end connectivity.

## 📡 API Reference

| Method | Endpoint | Description |
|--------|----------|--------------|
| `GET` | `/health` | Service health check |
| `GET` | `/nodes` | List all fulfillment nodes with current load/inventory |
| `POST` | `/optimize/node` | Returns the optimal fulfillment node for a given order |
| `POST` | `/optimize/route` | Returns a bundled delivery + return route |
| `POST` | `/forecast/demand` | Returns demand-aware inventory recommendations |

**Example — Node Selection Request**

```bash
curl -X POST http://localhost:8000/optimize/node \
  -H "Content-Type: application/json" \
  -d '{
        "order_location": {"lat": 12.9716, "lng": 77.5946},
        "sku": "SKU-10293",
        "quantity": 2
      }'
```

**Example — Response**

```json
{
  "selected_node": "NODE-BLR-04",
  "estimated_cost": 42.7,
  "estimated_delivery_time_mins": 95,
  "alternatives": ["NODE-BLR-02", "NODE-BLR-07"]
}
```

## 🧮 Algorithmic Approach

- **Graph Modeling:** Fulfillment nodes and delivery points are modeled as vertices in a weighted graph (`networkx.Graph` / `DiGraph`), with edges weighted by a composite cost function of distance, fuel, current load, and time-to-deliver.
- **Node Selection:** A cost-minimization search (Dijkstra-based, extended with a custom weighting function) ranks candidate nodes in real time using live inventory and demand signals rather than static proximity.
- **Route Bundling:** Delivery and return requests within a serviceable radius/time-window are clustered and merged using a greedy/heuristic bundling strategy to minimize total route cost while respecting vehicle capacity constraints.
- **Demand-Aware Routing:** A lightweight forecasting layer (Pandas/NumPy-based, extensible to ML models) feeds predicted demand back into the node-scoring function, discouraging over-fulfillment from low-demand nodes.

## 📈 Impact & Results

| Metric | Baseline (Static Rules) | With FulfillMesh | Improvement |
|--------|--------------------------|-------------------|-------------|
| Logistics cost per order | Baseline | Optimized | **Up to 20% reduction** |
| Redundant delivery/return trips | High | Consolidated | Significant reduction |
| Vehicle utilization | Low–Moderate | Improved | Higher load factor per trip |
| Stock-demand alignment | Disconnected | Synced | Reduced overstocking |

> Figures above are based on simulated scenarios in this prototype and are intended to demonstrate directional impact, not audited production metrics.

## 🧪 Testing

```bash
cd backend
pytest tests/ -v
```

```bash
cd frontend
npm run test
```

## 🗺️ Roadmap

- [ ] Replace heuristic bundling with a proper VRP (Vehicle Routing Problem) solver (e.g., OR-Tools)
- [ ] Integrate live traffic/weather signals into route cost weighting
- [ ] Add a proper ML-based demand forecasting model (replacing the current statistical baseline)
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

**Author:** Your Name
**Email:** your.email@example.com
**LinkedIn:** [linkedin.com/in/your-profile](https://linkedin.com)
**Demo Video:** [https://youtu.be/q6AUIC6gOYQ](https://youtu.be/q6AUIC6gOYQ)

---

<div align="center">

If this project helped you, consider giving it a ⭐ on GitHub!

</div>
