#!/usr/bin/env python3
"""
Test PostgreSQL connection
"""

import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

def test_connection():
    """Test database connection"""
    try:
        # Test with environment variables
        conn = psycopg2.connect(
            host=os.getenv("DB_HOST", "localhost"),
            port=os.getenv("DB_PORT", "5432"),
            database=os.getenv("DB_NAME", "church_attendance"),
            user=os.getenv("DB_USER", "church_user"),
            password=os.getenv("DB_PASSWORD", "")
        )
        
        cursor = conn.cursor()
        cursor.execute("SELECT version();")
        version = cursor.fetchone()
        print(f"✅ Connection successful!")
        print(f"PostgreSQL version: {version[0]}")
        
        cursor.close()
        conn.close()
        
    except psycopg2.Error as e:
        print(f"❌ Connection failed: {e}")
        print("\nTroubleshooting tips:")
        print("1. Check if PostgreSQL is running")
        print("2. Verify database name exists")
        print("3. Check username and password")
        print("4. Ensure user has proper permissions")

if __name__ == "__main__":
    test_connection()