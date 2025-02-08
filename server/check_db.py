import sqlite3

conn = sqlite3.connect('instance_prices.db')
cursor = conn.cursor()

# Get column names
cursor.execute('PRAGMA table_info(instances)')
columns = [column[1] for column in cursor.fetchall()]
print("\nColumns:", columns)

# Get first 5 rows
print("\nFirst 5 records:")
cursor.execute('SELECT * FROM instances LIMIT 5')
rows = cursor.fetchall()
for row in rows:
    print(row)

# Get total count
cursor.execute('SELECT COUNT(*) FROM instances')
count = cursor.fetchone()[0]
print(f"\nTotal records: {count}")

conn.close()