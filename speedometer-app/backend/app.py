from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# MySQL connection
db = mysql.connector.connect(
    host="localhost",
    port=3306,
    user="root",
    password="",
    database="speedometer_db"
)

@app.route('/customSegments', methods=['GET'])
def get_custom_segments():
    print('into loop')
    cursor = db.cursor(dictionary=True)
    query = "SELECT speed FROM speed_data ORDER BY speed ASC"  # Query to get speed values as segment stops
    cursor.execute(query)
    custom_segments = cursor.fetchall()
    cursor.close()
    speed_values = [entry['speed'] for entry in custom_segments]
    return jsonify(speed_values)

with app.app_context():
    get_custom_segments()

if __name__ == '__main__':
    app.run(port=3000,debug=True)
