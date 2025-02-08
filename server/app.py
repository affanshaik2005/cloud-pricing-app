from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('instance_prices.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/api/instances', methods=['GET'])
def get_instances():
    cloud_type = request.args.get('cloud_type', 'AWS')
    region = request.args.get('region', 'eu-west-1')
    min_ram = request.args.get('min_ram', 0)
    max_ram = request.args.get('max_ram', float('inf'))
    min_cpu = request.args.get('min_cpu', 0)
    max_cpu = request.args.get('max_cpu', float('inf'))

    conn = get_db_connection()
    query = '''
        SELECT * FROM instances
        WHERE cloud_type = ?
        AND region = ?
        AND ram >= ?
        AND ram <= ?
        AND cpu >= ?
        AND cpu <= ?
    '''
    instances = conn.execute(query, (cloud_type, region, min_ram, max_ram, min_cpu, max_cpu)).fetchall()
    conn.close()

    return jsonify([dict(ix) for ix in instances])

if __name__ == '__main__':
    app.run(debug=True)
