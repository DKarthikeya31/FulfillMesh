import pandas as pd
from collections import defaultdict

EXCEL_FILE = "walmart_dataset_10000_orders.xlsx"

CATEGORY_TO_PRODUCTS = {
    "Beverages": [
        "Aquafina 12 Pack Iced Tea",
        "Coca-Cola 12 Pack Cans",
        "Dr Pepper 12 Pack Cans",
        "Great Value Apple Juice 1 Gallon",
        "Great Value Orange Juice 1 Gallon",
        "Lipton 12 Pack Iced Tea",
        "Lipton 24 Pack Water",
        "Pepsi 12 Pack Cans"
    ],
    # ... (add other static categories if Excel is missing)
}

def load_category_product_data():
    """Load category and product data from Excel file or use static data as fallback"""
    try:
        df = pd.read_excel(EXCEL_FILE, sheet_name=1)
        df.columns = df.columns.str.strip().str.lower()
        category_to_products = defaultdict(set)
        product_to_category = {}
        product_to_sku = defaultdict(set)
        for _, row in df.iterrows():
            category_to_products[row['category']].add(row['sku_name'])
            product_to_category[row['sku_name']] = row['category']
            product_to_sku[row['sku_name']].add(str(row['sku_id']))
        category_to_products = {k: sorted(list(v)) for k, v in category_to_products.items()}
        product_to_sku = {k: sorted(list(v)) for k, v in product_to_sku.items()}
        return category_to_products, product_to_sku, product_to_category
    except Exception as e:
        # Fallback to static data if Excel file is not available
        product_to_sku = {}
        product_to_category = {}
        for category, products in CATEGORY_TO_PRODUCTS.items():
            for i, product in enumerate(products):
                product_to_sku[product] = [f"SKU_{category[:3].upper()}_{i+1:03d}"]
                product_to_category[product] = category
        return CATEGORY_TO_PRODUCTS, product_to_sku, product_to_category
