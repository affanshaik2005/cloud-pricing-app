import json
import sqlite3
from dataclasses import dataclass
import urllib.request

url = 'Our Link to be kept'
@dataclass
class Product:
    id: str
    unit: str
    price_per_unit: str
    vcpu: str
    memory: str
    location: str
    instance_type: str

def parse_pricing_data(data: dict) -> list[Product]:
    products = []
    on_demand = data['terms']['OnDemand']

    for product_id, product in data['products'].items():
        if product.get('productFamily') != 'Database Instance':
            continue
        attributes = product['attributes']
        if attributes.get('location') != 'EU (Ireland)':  # eu-west-1 region
            continue
            
        on_demand_pricing_data = on_demand[product_id]
        for _, product_subtype_pricing_data in on_demand_pricing_data.items():
            for _, product_dimension_pricing_data in product_subtype_pricing_data['priceDimensions'].items():
                products.append(Product(
                    id=product_id,
                    unit=product_dimension_pricing_data['unit'],
                    price_per_unit=product_dimension_pricing_data['pricePerUnit']['USD'],
                    vcpu=attributes['vcpu'],
                    memory=attributes['memory'].replace(' GiB', ''),
                    location='eu-west-1',
                    instance_type=attributes['instanceType']
                ))

    return products

def create_database():
    conn = sqlite3.connect('../server/instance_prices.db')
    cursor = conn.cursor()

    # Drop existing table if it exists
    cursor.execute('DROP TABLE IF EXISTS instances')

    # Create new table
    cursor.execute('''
    CREATE TABLE instances (
        id TEXT PRIMARY KEY,
        cloud_type TEXT NOT NULL,
        region TEXT NOT NULL,
        instance_type TEXT NOT NULL,
        cpu INTEGER NOT NULL,
        ram INTEGER NOT NULL,
        price REAL NOT NULL,
        unit TEXT NOT NULL
    )
    ''')

    return conn, cursor

def seed_database(cursor, products: list[Product]):
    for product in products:
        try:
            cursor.execute('''
            INSERT INTO instances 
            (id, cloud_type, region, instance_type, cpu, ram, price, unit)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                product.id,
                'AWS',
                product.location,
                product.instance_type,
                int(product.vcpu),
                int(float(product.memory)),
                float(product.price_per_unit),
                product.unit
            ))
        except (ValueError, sqlite3.Error) as e:
            print(f"Error inserting product {product.instance_type}: {e}")

if __name__ == '__main__':
    try:
        # Try to load from local file first
        with open('./index.json', 'r') as f:
            data = json.load(f)
    except FileNotFoundError:
        # If local file not found, try URL
        with urllib.request.urlopen(url) as f:
            data = json.loads(f.read().decode('utf-8'))

    parsed_data = parse_pricing_data(data)
    conn, cursor = create_database()
    
    seed_database(cursor, parsed_data)
    conn.commit()
    
    # Verify data was inserted
    cursor.execute('SELECT COUNT(*) FROM instances')
    count = cursor.fetchone()[0]
    print(f"Successfully inserted {count} instances")
    
    conn.close()