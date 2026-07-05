# Walmart Supply Chain Optimization – AI-Powered Fulfillment Engine

## 🚀 Overview

This project presents an AI-powered decision engine designed to eliminate inefficiencies, fragmentation, and cost leakage within Walmart’s retail supply chain — with a specific focus on last-mile delivery, return bundling, and dynamic fulfillment node selection.

Despite Walmart’s massive scale and significant investments in technologies such as Eden, Spark, and Luminate, critical gaps still persist in its supply chain operations. Our solution is built to bridge those gaps using real-time intelligence and optimization strategies.

---

## 🎥 Demo Video

[![Watch the demo]](https://youtu.be/q6AUIC6gOYQ)

---

## 🔍 Problem Statement

The Walmart retail supply chain currently suffers from:

- 🏪 Inefficient Fulfillment Node Selection: Nodes are selected based on static proximity rules, without accounting for real-time cost-effectiveness or dynamic demand.  
- 🔁 Fragmented Return and Delivery Routes: Returns and deliveries are handled via separate logistical flows, leading to redundant routes, higher fuel usage, and underutilized vehicles.  
- 📊 Isolated Demand Planning: Demand forecasts are disconnected from actual local inventory movement and fulfillment routing, leading to overstocking and underutilization.

These shortcomings result in:

- Increased cost per order  
- Duplicate delivery/return routes  
- Overstocking at low-demand locations  
- Poor driver utilization  
- Operational overheads amounting to millions annually  

---

## 💡 Solution

We propose an AI-powered smart fulfillment engine that:

- Optimizes Fulfillment Node Selection using dynamic cost-efficiency and real-time stock-demand matching  
- Bundles Deliveries and Returns to minimize redundant routes and improve vehicle utilization  
- Implements Demand-Aware Inventory Routing by integrating demand signals with local inventory flow  

---

## 🧠 Features

- 📦 Smart Fulfillment Node Selection  
- 🔁 AI-Driven Delivery & Return Route Bundling  
- 📊 Demand-Aware Local Inventory Movement  
- ⚙️ Real-time Optimization Engine  
- 💰 Significant Reduction in Per-Order Operational Costs  

---

## 🛠️ Tech Stack

- Python – Core engine logic and simulation  
- Pandas, NumPy – Data processing and modeling  
- NetworkX – Graph-based route optimization  
- Flask / FastAPI – For prototype API endpoints  
- React.js – Front-end simulation UI  

---

## 👥 Team

- Shiv Dixit  
- Radhi Patel

---

## 📈 Impact

With smarter routing and fulfillment node decisions, Walmart can achieve:

- Up to 20% reduction in logistics costs  
- Improved sustainability via route consolidation  
- Better stock utilization and demand fulfillment  
- Scalable decision-making across nodes and regions  

---

## 🧪 How to Run

### Frontend

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Go to the backend folder
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Run the Flask API
python app.py 
