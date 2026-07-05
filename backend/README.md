# Walmart Backend API

## Setup Instructions

1. **Install dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Set up environment variables:**
   ```bash
   export OPENWEATHER_API_KEY="your_openweather_api_key"
   export GOOGLE_MAPS_API_KEY="your_google_maps_api_key"
   ```

3. **Add your data files:**
   - Place `walmart_dataset_10000_orders.xlsx` in the `data/` folder
   - Place any other data files in `data/` folder

4. **Train the ML model (if needed):**
   ```bash
   python models/demand_model.py
   ```

5. **Run the Flask server:**
   ```bash
   python app.py
   ```

## API Endpoints

### `/api/process_order` (POST)
Process customer orders and find optimal fulfillment combinations.

**Request body:**
```json
{
  "requested_skus": ["SKU_001", "SKU_002"],
  "location": {
    "area": "Downtown Austin",
    "latitude": 30.2672,
    "longitude": -97.7431
  }
}
```

### `/api/predict_demand` (POST)
Predict demand for specific SKU at specific node.

**Request body:**
```json
{
  "node_id": "FC_MW09",
  "SKU_id": "SKU_BEV_003",
  "SLA_type": "same-day",
  "node_type": "Fulfillment Center",
  "day": 23,
  "hour": 18,
  "weekday": 3,
  "month": 7
}
```

## Folder Structure

```
backend/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── README.md             # This file
├── routes/               # API route handlers
│   ├── order_routes.py   # Order processing endpoints
│   └── prediction_routes.py # Demand prediction endpoints
├── utils/                # Utility functions
│   └── model_utils.py    # ML and data processing utilities
├── models/               # ML model files and training
│   ├── demand_model.py   # Model training script
│   ├── demand_model.pkl  # Trained model (generated)
│   └── demand_encoder.pkl # Encoders (generated)
├── data/                 # Data files and constants
│   ├── constants.py      # Static data (locations, products)
│   └── walmart_dataset_10000_orders.xlsx # Your data file
└── config/               # Configuration
    └── settings.py       # App configuration and settings
```

## Implementation Steps

1. **Copy your existing logic** from the original files into the appropriate modules
2. **Update imports** in `app.py` to register the blueprints
3. **Add your API keys** to environment variables or `config/settings.py`
4. **Place your data files** in the `data/` folder
5. **Train your models** if needed
6. **Test the endpoints** with your frontend