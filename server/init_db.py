import sqlite3

def init_db():
    conn = sqlite3.connect('instance_prices.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE instances (
            id INTEGER PRIMARY KEY,
            cloud_type TEXT,
            region TEXT,
            instance_type TEXT,
            ram INTEGER,
            cpu INTEGER,
            price REAL
        )
    ''')
    conn.commit()
    conn.close()

def populate_db():
    conn = sqlite3.connect('instance_prices.db')
    c = conn.cursor()
    instances = [
        # Add your instance data here
        ('AWS', 'eu-west-1', 't2.micro', 1, 1, 0.0116),
        ('AWS', 'eu-west-1', 't2.small', 2, 1, 0.023),
        # ... more instances ...
    ]
    c.executemany('''
        INSERT INTO instances (cloud_type, region, instance_type, ram, cpu, price)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', instances)
    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db()
    populate_db()
