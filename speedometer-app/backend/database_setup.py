import mysql.connector
import os

def create_database_and_table():
    db = mysql.connector.connect(
        host="localhost",
        port=3306,
        user="root",
        password=""
    )

    cursor = db.cursor()

    # Create database if it doesn't exist
    cursor.execute("CREATE DATABASE IF NOT EXISTS speedometer_db")
    cursor.execute("USE speedometer_db")

    # Create table if it doesn't exist
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS speed_data (
        id INT AUTO_INCREMENT PRIMARY KEY,
        speed INT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    """)
    cursor.execute("""
    INSERT INTO speedometer_db.speed_data (id, speed) VALUES 
    ('1','0'),
    ('2','12'),
    ('3','24'),
    ('4','36'),
    ('5','48'),
    ('6','60'),
    ('7','72'),
    ('8','84'),
    ('9','96'),
    ('10','108'),
    ('11','120');
    """)
    db.commit()

    cursor.close()
    db.close()

if __name__ == "__main__":
    create_database_and_table()
