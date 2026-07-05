# # Machine Learning utilities and data processing
# # Add your ML model logic here

# # import pandas as pd
# # import requests
# # import time
# # import numpy as np
# # from itertools import combinations
# # from math import radians, cos, sin, asin, sqrt
# # from sklearn.preprocessing import LabelEncoder

# # # === CONFIG ===
# # OPENWEATHER_API_KEY = "your_openweather_api_key"
# # GOOGLE_MAPS_API_KEY = "your_google_maps_api_key"
# # EXCEL_FILE = "walmart_dataset_10000_orders.xlsx"
# # FUEL_PRICE_DEFAULT = 0.7
# # API_DELAY = 1.0
# # MAX_COMBOS = 10

# # def parse_geo(loc_str):
# #     """Parse geo coordinates from string"""
# #     # Add your existing parse_geo logic here
# #     pass

# # def haversine(lat1, lon1, lat2, lon2):
# #     """Calculate distance between two points using haversine formula"""
# #     # Add your existing haversine logic here
# #     pass

# # def get_google_route(lat1, lon1, lat2, lon2):
# #     """Get route information from Google Maps API"""
# #     # Add your existing Google Maps logic here
# #     pass

# # def get_weather_condition(lat, lon):
# #     """Get weather condition from OpenWeather API"""
# #     # Add your existing weather logic here
# #     pass

# # def load_and_prepare_data(requested_skus, latitude, longitude):
# #     """Load and filter inventory data"""
# #     # Add your existing data loading logic here
# #     pass

# # def train_models(order_df):
# #     """Train XGBoost models for cost and surge prediction"""
# #     # Add your existing model training logic here
# #     pass

# # def evaluate_combos(inventory_df, order_df, requested_skus, customer_lat, customer_lon, xgb_cost_model, xgb_surge_model, encoders):
# #     """Evaluate different node combinations for order fulfillment"""
# #     # Add your existing combo evaluation logic here
# #     pass

# # def load_model_and_encoder():
# #     """Load trained ML model and encoders"""
# #     # Add your existing model loading logic here
# #     pass

# # def safe_encode_input(raw_input, encoder):
# #     """Safely encode input data for prediction"""
# #     # Add your existing encoding logic here
# #     pass


# import pandas as pd
# import requests
# import time
# import xgboost as xgb
# from itertools import combinations
# from math import radians, cos, sin, asin, sqrt
# from sklearn.preprocessing import LabelEncoder
# import numpy as np

# # === CONFIG ===
# import os
# OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
# GOOGLE_MAPS_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")
# EXCEL_FILE = "walmart-futuristic-commerce\backend\data\walmart_dataset_10000_orders.xlsx"
# FUEL_PRICE_DEFAULT = 0.7
# API_DELAY = 1.0
# MAX_COMBOS = 10

# # === Load Excel ===
# xls = pd.ExcelFile(EXCEL_FILE)
# order_df = xls.parse("Order")
# inventory_df = xls.parse("Node")

# # === Helper Functions ===
# def parse_geo(loc_str):
#     try:
#         if pd.isna(loc_str) or not str(loc_str).strip():
#             return (None, None)
#         coords = str(loc_str).replace(" ", "").split(",")
#         if len(coords) != 2:
#             return (None, None)
#         lat, lon = float(coords[0]), float(coords[1])
#         if not (-90 <= lat <= 90) or not (-180 <= lon <= 180):
#             return (None, None)
#         return (lat, lon)
#     except:
#         return (None, None)

# def haversine(lat1, lon1, lat2, lon2):
#     if None in (lat1, lon1, lat2, lon2): return 0
#     lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
#     dlon = lon2 - lon1
#     dlat = lat2 - lat1
#     a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
#     return 6371 * 2 * asin(sqrt(a))

# route_cache = {}
# def get_google_route(lat1, lon1, lat2, lon2):
#     key = (round(lat1, 4), round(lon1, 4), round(lat2, 4), round(lon2, 4))
#     if key in route_cache:
#         return route_cache[key]
#     try:
#         url = f"https://maps.googleapis.com/maps/api/directions/json?origin={lat1},{lon1}&destination={lat2},{lon2}&key={GOOGLE_MAPS_API_KEY}"
#         res = requests.get(url).json()
#         if res['status'] == 'OK':
#             leg = res['routes'][0]['legs'][0]
#             dist_km = leg['distance']['value'] / 1000
#             time_min = leg['duration']['value'] / 60
#         else:
#             dist_km = haversine(lat1, lon1, lat2, lon2)
#             time_min = (dist_km / 50) * 60
#     except:
#         print("map api not working")
#         dist_km = haversine(lat1, lon1, lat2, lon2)
#         time_min = (dist_km / 50) * 60
#     route_cache[key] = (dist_km, time_min)
#     return dist_km, time_min

# weather_cache = {}
# def get_weather_condition(lat, lon):
#     key = (round(lat, 2), round(lon, 2))
#     if key in weather_cache:
#         return weather_cache[key]
#     try:
#         url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={OPENWEATHER_API_KEY}"
#         res = requests.get(url).json()
#         weather = res['weather'][0]['main'] if 'weather' in res else 'Clear'
#     except:
#         print("not weather")
#         weather = 'Clear'
#     weather_cache[key] = weather
#     return weather

# def load_and_prepare_data(requested_skus,latitude,longitude):
#     xls = pd.ExcelFile(EXCEL_FILE)
#     order_df = xls.parse("Order")
#     inventory_df = xls.parse("Node")

#     customer_lat, customer_lon = latitude,longitude
#     print(customer_lat,customer_lon)
#     valid_nodes = []
#     for node_id in order_df['node_id'].unique():
#         node_geo = order_df[order_df['node_id'] == node_id]['node_geo_location'].iloc[0]
#         lat, lon = parse_geo(node_geo)
#         if lat and lon:
#             valid_nodes.append(node_id)

#     inventory_df = inventory_df[inventory_df['node_id'].isin(valid_nodes)]

#     order_meta = order_df[['node_id', 'node_geo_location', 'node_type', 'SLA_type', 'live_traffic_score']].drop_duplicates()
#     inventory_df = inventory_df.merge(order_meta, on='node_id', how='left')

#     pricing_cols = ['node_id', 'spark_price_usd', '3PL_dynamic_price_usd', 'spark_driver_availability']
#     pricing_info = order_df[pricing_cols].drop_duplicates()
#     inventory_df = inventory_df.merge(pricing_info, on='node_id', how='left')

#     inventory_df = inventory_df[
#         (inventory_df['SKU_id'].isin(requested_skus)) & (inventory_df['is_available'])
#     ]

#     print("\n Inventory filtered for requested SKUs and available stock:")
#     print(inventory_df[['node_id', 'SKU_id', 'is_available']].drop_duplicates())

#     return inventory_df, order_df, customer_lat, customer_lon

# def train_models(order_df):
#     df = order_df.dropna(subset=[
#         'route_distance_km', 'route_time_minutes', 'spark_price_usd',
#         '3PL_dynamic_price_usd', 'fuel_price_per_km_usd', 'spark_driver_availability'
#     ])
#     df['final_price'] = df.apply(
#         lambda r: r['spark_price_usd'] if r['spark_price_usd'] < r['3PL_dynamic_price_usd'] and r['spark_driver_availability'] > 0
#         else r['3PL_dynamic_price_usd'], axis=1)
#     df['actual_cost'] = df['fuel_price_per_km_usd'] * df['route_distance_km'] + df['final_price']

#     cat_cols = ['SLA_type', 'weather_conditions', 'node_type']
#     encoders = {}
#     for col in cat_cols:
#         le = LabelEncoder()
#         df[col] = le.fit_transform(df[col].astype(str))
#         encoders[col] = le

#     Xc = df[['route_distance_km', 'route_time_minutes', 'live_traffic_score', 'SLA_type', 'weather_conditions', 'node_type']]
#     yc = df['actual_cost']
#     xgb_cost_model = xgb.XGBRegressor(objective='reg:squarederror')
#     xgb_cost_model.fit(Xc, yc)

#     df['normalized_cost'] = df['actual_cost'] / (df['route_distance_km'] + 0.1)
#     Xs = df[['live_traffic_score', 'SLA_type', 'weather_conditions']]
#     ys = df['normalized_cost']
#     xgb_surge_model = xgb.XGBRegressor(objective='reg:squarederror')
#     xgb_surge_model.fit(Xs, ys)

#     return xgb_cost_model, xgb_surge_model, encoders

# def evaluate_combos(inventory_df, order_df, requested_skus, customer_lat, customer_lon, xgb_cost_model, xgb_surge_model, encoders):
#     node_to_skus = inventory_df.groupby("node_id")['SKU_id'].apply(set).to_dict()
#     all_nodes = list(node_to_skus.keys())
#     request_set = set(requested_skus)

#     valid_combos = []
#     for r in range(1, len(requested_skus) + 1):
#         for combo in combinations(all_nodes, r):
#             combined = set().union(*(node_to_skus[n] for n in combo))
#             if request_set.issubset(combined):
#                 valid_combos.append((combo, len(combined - request_set)))
#         if valid_combos:
#             break

#     valid_combos.sort(key=lambda x: (len(x[0]), x[1]))
#     valid_combos = [c[0] for c in valid_combos[:MAX_COMBOS]]

#     results = []
#     for combo in valid_combos:
#         combo_df = inventory_df[
#             (inventory_df['node_id'].isin(combo)) & (inventory_df['SKU_id'].isin(requested_skus)) & (inventory_df['is_available'])
#         ]
#         if combo_df['SKU_id'].nunique() < len(requested_skus):
#             continue

#         total_cost = 0
#         for node_id in combo:
#             node_df = combo_df[combo_df['node_id'] == node_id]
#             row = node_df.iloc[0]
#             node_lat, node_lon = parse_geo(row['node_geo_location'])
#             dist_km, time_min = get_google_route(node_lat, node_lon, customer_lat, customer_lon)
#             weather = get_weather_condition(node_lat, node_lon)

#             sla = encoders['SLA_type'].transform([row['SLA_type']])[0] if row['SLA_type'] in encoders['SLA_type'].classes_ else 0
#             weather_enc = encoders['weather_conditions'].transform([weather])[0] if weather in encoders['weather_conditions'].classes_ else 0

#             if 'node_type' not in row or pd.isna(row['node_type']):
#                 print(f" node_type missing for node {node_id}, using default encoding 0")
#                 node_type_enc = 0
#             else:
#                 node_type_enc = encoders['node_type'].transform([row['node_type']])[0] if row['node_type'] in encoders['node_type'].classes_ else 0

#             spark_price = row['spark_price_usd']
#             pl_price = row['3PL_dynamic_price_usd']
#             spark_available = row['spark_driver_availability']
#             driver_cost = spark_price if spark_price < pl_price and spark_available > 0 else pl_price

#             x_input = pd.DataFrame([{
#                 'route_distance_km': dist_km,
#                 'route_time_minutes': time_min,
#                 'live_traffic_score': row['live_traffic_score'],
#                 'SLA_type': sla,
#                 'weather_conditions': weather_enc,
#                 'node_type': node_type_enc
#             }])

#             try:
#                 base_cost = xgb_cost_model.predict(x_input)[0]
#                 surge = xgb_surge_model.predict(x_input[['live_traffic_score', 'SLA_type', 'weather_conditions']])[0]
#                 total_cost += base_cost + surge + driver_cost
#             except:
#                 print("Surge not working, using fallback cost")
#                 total_cost += dist_km * FUEL_PRICE_DEFAULT + 50 + driver_cost

#             time.sleep(API_DELAY)

#         results.append({
#             "cost": float(total_cost),
#             "nodes": list(combo),
#             "skus": {nid: list(node_to_skus[nid]) for nid in combo},
#         })

#     results.sort(key=lambda x: x['cost'])

#     print("\n TOP 3 BEST COMBINATIONS (Minimal Places + Cost):")
#     for i, res in enumerate(results[:3]):
#         print(f"\nOption {i+1}:")
#         print(f"  Nodes: {tuple(res['nodes'])}")
#         print(f"  Total Estimated Cost: ${res['cost']:.2f}")
#         for nid, skus in res['skus'].items():
#             print(f"    {nid} SKUs: {skus}")

#     return results[:3]

# import joblib
# import pandas as pd
# import numpy as np

# MODEL_PATH = "walmart-futuristic-commerce/backend/models/demand_model.pkl"
# ENCODER_PATH = "walmart-futuristic-commerce/backend/models/demand_encoder.pkl"

# def load_model_and_encoder():
#     model = joblib.load(MODEL_PATH)
#     encoder = joblib.load(ENCODER_PATH)
#     return model, encoder

# def safe_encode_input(raw_input, encoder):
#     df = pd.DataFrame([raw_input])
#     for col, le in encoder.items():
#         if col in df.columns:
#             df[col] = df[col].astype(str).apply(lambda x: x if x in le.classes_ else 'Unknown')
#             if 'Unknown' not in le.classes_:
#                 le.classes_ = np.append(le.classes_, 'Unknown')
#             df[col] = le.transform(df[col])
#     return df



import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import xgboost as xgb
import joblib
import requests
import time
from itertools import combinations
from math import radians, cos, sin, asin, sqrt

# === CONFIG ===
OPENWEATHER_API_KEY = "Your open weather api key"
GOOGLE_MAPS_API_KEY = "Your open ai key"
EXCEL_FILE = "walmart_dataset_10000_orders.xlsx"
FUEL_PRICE_DEFAULT = 0.7
API_DELAY = 1.0
MAX_COMBOS = 10

MODEL_PATH = "demand_model.pkl"
ENCODER_PATH = "demand_encoder.pkl"

def load_model_and_encoder():
    """Load the trained model and encoder"""
    try:
        model = joblib.load(MODEL_PATH)
        encoder = joblib.load(ENCODER_PATH)
        return model, encoder
    except FileNotFoundError:
        print("Model or encoder files not found. Please train the model first.")
        return None, None

def safe_encode_input(raw_input, encoder):
    """Safely encode input data handling unknown categories"""
    df = pd.DataFrame([raw_input])
    for col, le in encoder.items():
        if col in df.columns:
            df[col] = df[col].astype(str).apply(lambda x: x if x in le.classes_ else 'Unknown')
            if 'Unknown' not in le.classes_:
                le.classes_ = np.append(le.classes_, 'Unknown')
            df[col] = le.transform(df[col])
    return df

def parse_geo(loc_str):
    """Parse geographical coordinates from string"""
    try:
        if pd.isna(loc_str) or not str(loc_str).strip():
            return (None, None)
        coords = str(loc_str).replace(" ", "").split(",")
        if len(coords) != 2:
            return (None, None)
        lat, lon = float(coords[0]), float(coords[1])
        if not (-90 <= lat <= 90) or not (-180 <= lon <= 180):
            return (None, None)
        return (lat, lon)
    except:
        return (None, None)

def haversine(lat1, lon1, lat2, lon2):
    """Calculate haversine distance between two points"""
    if None in (lat1, lon1, lat2, lon2): 
        return 0
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    return 6371 * 2 * asin(sqrt(a))

# Cache for route calculations
route_cache = {}

def get_google_route(lat1, lon1, lat2, lon2):
    """Get route information using Google Maps API with caching"""
    key = (round(lat1, 4), round(lon1, 4), round(lat2, 4), round(lon2, 4))
    if key in route_cache:
        return route_cache[key]
    
    try:
        url = f"https://maps.googleapis.com/maps/api/directions/json?origin={lat1},{lon1}&destination={lat2},{lon2}&key={GOOGLE_MAPS_API_KEY}"
        res = requests.get(url).json()
        if res['status'] == 'OK':
            leg = res['routes'][0]['legs'][0]
            dist_km = leg['distance']['value'] / 1000
            time_min = leg['duration']['value'] / 60
        else:
            dist_km = haversine(lat1, lon1, lat2, lon2)
            time_min = (dist_km / 50) * 60
    except:
        print("Google Maps API not working, using fallback")
        dist_km = haversine(lat1, lon1, lat2, lon2)
        time_min = (dist_km / 50) * 60
    
    route_cache[key] = (dist_km, time_min)
    return dist_km, time_min

# Cache for weather data
weather_cache = {}

def get_weather_condition(lat, lon):
    """Get weather condition with caching"""
    key = (round(lat, 2), round(lon, 2))
    if key in weather_cache:
        return weather_cache[key]
    
    try:
        url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={OPENWEATHER_API_KEY}"
        res = requests.get(url).json()
        weather = res['weather'][0]['main'] if 'weather' in res else 'Clear'
    except:
        print("Weather API not working, using default")
        weather = 'Clear'
    
    weather_cache[key] = weather
    return weather

def load_and_prepare_data(requested_skus, latitude, longitude):
    """Load and prepare data for processing"""
    try:
        xls = pd.ExcelFile(EXCEL_FILE)
        order_df = xls.parse("Order")
        inventory_df = xls.parse("Node")
    except FileNotFoundError:
        print(f"Excel file {EXCEL_FILE} not found")
        return None, None, None, None

    customer_lat, customer_lon = latitude, longitude
    print(f"Customer location: {customer_lat}, {customer_lon}")
    
    # Filter valid nodes with proper coordinates
    valid_nodes = []
    for node_id in order_df['node_id'].unique():
        node_geo = order_df[order_df['node_id'] == node_id]['node_geo_location'].iloc[0]
        lat, lon = parse_geo(node_geo)
        if lat and lon:
            valid_nodes.append(node_id)

    inventory_df = inventory_df[inventory_df['node_id'].isin(valid_nodes)]

    # Merge additional data
    order_meta = order_df[['node_id', 'node_geo_location', 'node_type', 'SLA_type', 'live_traffic_score']].drop_duplicates()
    inventory_df = inventory_df.merge(order_meta, on='node_id', how='left')

    pricing_cols = ['node_id', 'spark_price_usd', '3PL_dynamic_price_usd', 'spark_driver_availability']
    pricing_info = order_df[pricing_cols].drop_duplicates()
    inventory_df = inventory_df.merge(pricing_info, on='node_id', how='left')

    # Filter for requested SKUs and availability
    inventory_df = inventory_df[
        (inventory_df['SKU_id'].isin(requested_skus)) & (inventory_df['is_available'])
    ]

    print("\n✅ Inventory filtered for requested SKUs and available stock:")
    print(inventory_df[['node_id', 'SKU_id', 'is_available']].drop_duplicates())

    return inventory_df, order_df, customer_lat, customer_lon

def train_models(order_df):
    """Train cost and surge models"""
    df = order_df.dropna(subset=[
        'route_distance_km', 'route_time_minutes', 'spark_price_usd',
        '3PL_dynamic_price_usd', 'fuel_price_per_km_usd', 'spark_driver_availability'
    ])
    
    # Calculate final price and actual cost
    df['final_price'] = df.apply(
        lambda r: r['spark_price_usd'] if r['spark_price_usd'] < r['3PL_dynamic_price_usd'] and r['spark_driver_availability'] > 0
        else r['3PL_dynamic_price_usd'], axis=1)
    df['actual_cost'] = df['fuel_price_per_km_usd'] * df['route_distance_km'] + df['final_price']

    # Encode categorical variables
    cat_cols = ['SLA_type', 'weather_conditions', 'node_type']
    encoders = {}
    for col in cat_cols:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col].astype(str))
        encoders[col] = le

    # Train cost model
    Xc = df[['route_distance_km', 'route_time_minutes', 'live_traffic_score', 'SLA_type', 'weather_conditions', 'node_type']]
    yc = df['actual_cost']
    xgb_cost_model = xgb.XGBRegressor(objective='reg:squarederror')
    xgb_cost_model.fit(Xc, yc)

    # Train surge model
    df['normalized_cost'] = df['actual_cost'] / (df['route_distance_km'] + 0.1)
    Xs = df[['live_traffic_score', 'SLA_type', 'weather_conditions']]
    ys = df['normalized_cost']
    xgb_surge_model = xgb.XGBRegressor(objective='reg:squarederror')
    xgb_surge_model.fit(Xs, ys)

    return xgb_cost_model, xgb_surge_model, encoders

def evaluate_combos(inventory_df, order_df, requested_skus, customer_lat, customer_lon, xgb_cost_model, xgb_surge_model, encoders):
    """Evaluate different node combinations"""
    node_to_skus = inventory_df.groupby("node_id")['SKU_id'].apply(set).to_dict()
    all_nodes = list(node_to_skus.keys())
    request_set = set(requested_skus)

    # Find valid combinations
    valid_combos = []
    for r in range(1, len(requested_skus) + 1):
        for combo in combinations(all_nodes, r):
            combined = set().union(*(node_to_skus[n] for n in combo))
            if request_set.issubset(combined):
                valid_combos.append((combo, len(combined - request_set)))
        if valid_combos:
            break

    valid_combos.sort(key=lambda x: (len(x[0]), x[1]))
    valid_combos = [c[0] for c in valid_combos[:MAX_COMBOS]]

    results = []
    for combo in valid_combos:
        combo_df = inventory_df[
            (inventory_df['node_id'].isin(combo)) & 
            (inventory_df['SKU_id'].isin(requested_skus)) & 
            (inventory_df['is_available'])
        ]
        
        if combo_df['SKU_id'].nunique() < len(requested_skus):
            continue

        total_cost = 0
        for node_id in combo:
            node_df = combo_df[combo_df['node_id'] == node_id]
            if node_df.empty:
                continue
                
            row = node_df.iloc[0]
            node_lat, node_lon = parse_geo(row['node_geo_location'])
            
            if node_lat is None or node_lon is None:
                continue
                
            dist_km, time_min = get_google_route(node_lat, node_lon, customer_lat, customer_lon)
            weather = get_weather_condition(node_lat, node_lon)

            # Encode categorical variables
            sla = encoders['SLA_type'].transform([row['SLA_type']])[0] if row['SLA_type'] in encoders['SLA_type'].classes_ else 0
            weather_enc = encoders['weather_conditions'].transform([weather])[0] if weather in encoders['weather_conditions'].classes_ else 0

            if 'node_type' not in row or pd.isna(row['node_type']):
                print(f"⚠ node_type missing for node {node_id}, using default encoding 0")
                node_type_enc = 0
            else:
                node_type_enc = encoders['node_type'].transform([row['node_type']])[0] if row['node_type'] in encoders['node_type'].classes_ else 0

            # Calculate costs
            spark_price = row['spark_price_usd']
            pl_price = row['3PL_dynamic_price_usd']
            spark_available = row['spark_driver_availability']
            driver_cost = spark_price if spark_price < pl_price and spark_available > 0 else pl_price

            x_input = pd.DataFrame([{
                'route_distance_km': dist_km,
                'route_time_minutes': time_min,
                'live_traffic_score': row['live_traffic_score'],
                'SLA_type': sla,
                'weather_conditions': weather_enc,
                'node_type': node_type_enc
            }])

            try:
                base_cost = xgb_cost_model.predict(x_input)[0]
                surge = xgb_surge_model.predict(x_input[['live_traffic_score', 'SLA_type', 'weather_conditions']])[0]
                total_cost += base_cost + surge + driver_cost
            except:
                print("Model prediction failed, using fallback cost")
                total_cost += dist_km * FUEL_PRICE_DEFAULT + 50 + driver_cost

            time.sleep(API_DELAY)

        results.append({
            "cost": float(total_cost),
            "nodes": list(combo),
            "skus": {nid: list(node_to_skus[nid]) for nid in combo},
        })

    results.sort(key=lambda x: x['cost'])

    print("\n✅ TOP 3 BEST COMBINATIONS (Minimal Places + Cost):")
    for i, res in enumerate(results[:3]):
        print(f"\nOption {i+1}:")
        print(f"  Nodes: {tuple(res['nodes'])}")
        print(f"  Total Estimated Cost: ${res['cost']:.2f}")
        for nid, skus in res['skus'].items():
            print(f"    {nid} SKUs: {skus}")

    return results[:3]
