#!/usr/bin/env python3
"""
Migration script to transfer data from SQLite to PostgreSQL
Updated to match the current FastAPI table structures
"""

import sqlite3
import psycopg2
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

# Database configurations
SQLITE_DB = "./church_attendance.db"
POSTGRES_CONFIG = {
    'host': os.getenv("DB_HOST", "localhost"),
    'port': os.getenv("DB_PORT", "5432"),
    'database': os.getenv("DB_NAME", "youth_attendance"),  # Updated to match your env var
    'user': os.getenv("DB_USER", "postgres"),
    'password': os.getenv("DB_PASSWORD", "")
}

def check_table_exists(cursor, table_name):
    """Check if a table exists in SQLite"""
    cursor.execute("""
        SELECT name FROM sqlite_master 
        WHERE type='table' AND name=?
    """, (table_name,))
    return cursor.fetchone() is not None

def get_table_columns(cursor, table_name):
    """Get column information for a table"""
    cursor.execute(f"PRAGMA table_info({table_name})")
    return cursor.fetchall()

def create_postgresql_tables(postgres_cursor):
    """Create PostgreSQL tables matching the FastAPI models"""
    print("Creating PostgreSQL tables...")
    
    # Create members table
    postgres_cursor.execute("""
        CREATE TABLE IF NOT EXISTS members (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            email VARCHAR(255),
            phone VARCHAR(20),
            executive BOOLEAN DEFAULT FALSE,
            office VARCHAR(100),
            date_of_birth DATE,
            is_new_member BOOLEAN DEFAULT TRUE,
            is_active BOOLEAN DEFAULT TRUE,
            joined_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            address TEXT,
            emergency_contact VARCHAR(20),
            fingerpprint_data TEXT,
            face_encoding TEXT
        );
    """)
    
    # Create attendances table
    postgres_cursor.execute("""
        CREATE TABLE IF NOT EXISTS attendances (
            id SERIAL PRIMARY KEY,
            member_id INTEGER REFERENCES members(id) ON DELETE CASCADE,
            service_date TIMESTAMP NOT NULL,
            checked_in_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            attendance_method VARCHAR(50) DEFAULT 'manual',
            notes TEXT
        );
    """)
    
    # Create service_schedules table
    postgres_cursor.execute("""
        CREATE TABLE IF NOT EXISTS service_schedules (
            id SERIAL PRIMARY KEY,
            service_name VARCHAR(200) NOT NULL,
            service_day INTEGER DEFAULT 6,
            service_time VARCHAR(10) NOT NULL,
            is_active BOOLEAN DEFAULT TRUE,
            description TEXT
        );
    """)
    
    # Create indexes
    postgres_cursor.execute("CREATE INDEX IF NOT EXISTS idx_members_email ON members(email);")
    postgres_cursor.execute("CREATE INDEX IF NOT EXISTS idx_members_active ON members(is_active);")
    postgres_cursor.execute("CREATE INDEX IF NOT EXISTS idx_attendance_member_id ON attendances(member_id);")
    postgres_cursor.execute("CREATE INDEX IF NOT EXISTS idx_attendance_service_date ON attendances(service_date);")
    
    print("✓ PostgreSQL tables created successfully")

def migrate_data():
    """Migrate data from SQLite to PostgreSQL"""
    
    # Connect to SQLite
    sqlite_conn = sqlite3.connect(SQLITE_DB)
    sqlite_conn.row_factory = sqlite3.Row  # Enable column access by name
    sqlite_cursor = sqlite_conn.cursor()
    
    # Connect to PostgreSQL
    postgres_conn = psycopg2.connect(**POSTGRES_CONFIG)
    postgres_cursor = postgres_conn.cursor()
    
    try:
        print("Starting migration...")
        
        # Create PostgreSQL tables first
        create_postgresql_tables(postgres_cursor)
        postgres_conn.commit()
        
        print("Checking SQLite database structure...")
        
        # Check which tables exist
        tables_to_check = ['members', 'attendances', 'service_schedules']
        existing_tables = []
        
        for table in tables_to_check:
            if check_table_exists(sqlite_cursor, table):
                existing_tables.append(table)
                print(f"✓ Found table: {table}")
                
                # Show column structure
                columns = get_table_columns(sqlite_cursor, table)
                print(f"  Columns: {[col[1] for col in columns]}")
            else:
                print(f"✗ Table not found: {table}")
        
        if not existing_tables:
            print("No tables found in SQLite database!")
            return
        
        # Migrate Members
        if 'members' in existing_tables:
            print("\nMigrating members...")
            sqlite_cursor.execute("SELECT * FROM members")
            members = sqlite_cursor.fetchall()
            
            if members:
                # Get column names from the first row
                columns = list(members[0].keys())
                print(f"Member columns: {columns}")
                
                for member in members:
                    # Handle the typo in fingerprint_data vs fingerpprint_data
                    member_data = dict(member)
                    
                    # Convert SQLite integer booleans to Python booleans
                    def convert_bool(value, default=False):
                        if value is None:
                            return default
                        return bool(value)
                    
                    # Map SQLite data to PostgreSQL, handling potential column name differences
                    postgres_cursor.execute("""
                        INSERT INTO members (
                            id, first_name, last_name, email, phone, executive, office,
                            date_of_birth, is_new_member, is_active, joined_date,
                            address, emergency_contact, fingerpprint_data, face_encoding
                        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        ON CONFLICT (id) DO UPDATE SET
                            first_name = EXCLUDED.first_name,
                            last_name = EXCLUDED.last_name,
                            email = EXCLUDED.email,
                            phone = EXCLUDED.phone,
                            executive = EXCLUDED.executive,
                            office = EXCLUDED.office,
                            date_of_birth = EXCLUDED.date_of_birth,
                            is_new_member = EXCLUDED.is_new_member,
                            is_active = EXCLUDED.is_active,
                            joined_date = EXCLUDED.joined_date,
                            address = EXCLUDED.address,
                            emergency_contact = EXCLUDED.emergency_contact,
                            fingerpprint_data = EXCLUDED.fingerpprint_data,
                            face_encoding = EXCLUDED.face_encoding
                    """, (
                        member_data.get('id'),
                        member_data.get('first_name'),
                        member_data.get('last_name'),
                        member_data.get('email'),
                        member_data.get('phone'),
                        convert_bool(member_data.get('executive'), False),
                        member_data.get('office'),
                        member_data.get('date_of_birth'),
                        convert_bool(member_data.get('is_new_member'), True),
                        convert_bool(member_data.get('is_active'), True),
                        member_data.get('joined_date'),
                        member_data.get('address'),
                        member_data.get('emergency_contact'),
                        member_data.get('fingerprint_data') or member_data.get('fingerpprint_data'),
                        member_data.get('face_encoding')
                    ))
                
                print(f"Migrated {len(members)} members")
            else:
                print("No members found to migrate")
        
        # Migrate Attendances
        if 'attendances' in existing_tables:
            print("\nMigrating attendance records...")
            sqlite_cursor.execute("SELECT * FROM attendances")
            attendances = sqlite_cursor.fetchall()
            
            if attendances:
                columns = list(attendances[0].keys())
                print(f"Attendance columns: {columns}")
                
                for attendance in attendances:
                    attendance_data = dict(attendance)
                    
                    postgres_cursor.execute("""
                        INSERT INTO attendances (
                            id, member_id, service_date, checked_in_at,
                            attendance_method, notes
                        ) VALUES (%s, %s, %s, %s, %s, %s)
                        ON CONFLICT (id) DO UPDATE SET
                            member_id = EXCLUDED.member_id,
                            service_date = EXCLUDED.service_date,
                            checked_in_at = EXCLUDED.checked_in_at,
                            attendance_method = EXCLUDED.attendance_method,
                            notes = EXCLUDED.notes
                    """, (
                        attendance_data.get('id'),
                        attendance_data.get('member_id'),
                        attendance_data.get('service_date'),
                        attendance_data.get('checked_in_at'),
                        attendance_data.get('attendance_method', 'manual'),
                        attendance_data.get('notes')
                    ))
                
                print(f"Migrated {len(attendances)} attendance records")
            else:
                print("No attendance records found to migrate")
        
        # Migrate Service Schedules
        if 'service_schedules' in existing_tables:
            print("\nMigrating service schedules...")
            sqlite_cursor.execute("SELECT * FROM service_schedules")
            schedules = sqlite_cursor.fetchall()
            
            if schedules:
                columns = list(schedules[0].keys())
                print(f"Service schedule columns: {columns}")
                
                for schedule in schedules:
                    schedule_data = dict(schedule)
                    
                    # Convert boolean for is_active
                    def convert_bool(value, default=True):
                        if value is None:
                            return default
                        return bool(value)
                    
                    postgres_cursor.execute("""
                        INSERT INTO service_schedules (
                            id, service_name, service_day, service_time,
                            is_active, description
                        ) VALUES (%s, %s, %s, %s, %s, %s)
                        ON CONFLICT (id) DO UPDATE SET
                            service_name = EXCLUDED.service_name,
                            service_day = EXCLUDED.service_day,
                            service_time = EXCLUDED.service_time,
                            is_active = EXCLUDED.is_active,
                            description = EXCLUDED.description
                    """, (
                        schedule_data.get('id'),
                        schedule_data.get('service_name'),
                        schedule_data.get('service_day', 6),
                        schedule_data.get('service_time'),
                        convert_bool(schedule_data.get('is_active'), True),
                        schedule_data.get('description')
                    ))
                
                print(f"Migrated {len(schedules)} service schedules")
            else:
                print("No service schedules found to migrate")
        
        # Update sequences to match the highest ID
        print("\nUpdating sequences...")
        
        if 'members' in existing_tables:
            postgres_cursor.execute("""
                SELECT setval('members_id_seq', 
                    COALESCE((SELECT MAX(id) FROM members), 1), 
                    (SELECT MAX(id) FROM members) IS NOT NULL
                );
            """)
        
        if 'attendances' in existing_tables:
            postgres_cursor.execute("""
                SELECT setval('attendances_id_seq', 
                    COALESCE((SELECT MAX(id) FROM attendances), 1), 
                    (SELECT MAX(id) FROM attendances) IS NOT NULL
                );
            """)
        
        if 'service_schedules' in existing_tables:
            postgres_cursor.execute("""
                SELECT setval('service_schedules_id_seq', 
                    COALESCE((SELECT MAX(id) FROM service_schedules), 1), 
                    (SELECT MAX(id) FROM service_schedules) IS NOT NULL
                );
            """)
        
        postgres_conn.commit()
        print("\n✓ Migration completed successfully!")
        
        # Display summary
        print("\n=== Migration Summary ===")
        for table in existing_tables:
            sqlite_cursor.execute(f"SELECT COUNT(*) FROM {table}")
            count = sqlite_cursor.fetchone()[0]
            print(f"{table}: {count} records")
        
    except Exception as e:
        print(f"\n✗ Migration failed: {e}")
        postgres_conn.rollback()
        raise
    
    finally:
        sqlite_conn.close()
        postgres_conn.close()

def verify_migration():
    """Verify the migration was successful"""
    print("\n=== Verifying Migration ===")
    
    try:
        postgres_conn = psycopg2.connect(**POSTGRES_CONFIG)
        postgres_cursor = postgres_conn.cursor()
        
        tables = ['members', 'attendances', 'service_schedules']
        
        for table in tables:
            postgres_cursor.execute(f"SELECT COUNT(*) FROM {table}")
            count = postgres_cursor.fetchone()[0]
            print(f"PostgreSQL {table}: {count} records")
        
        postgres_conn.close()
        
    except Exception as e:
        print(f"Verification failed: {e}")

if __name__ == "__main__":
    try:
        migrate_data()
        verify_migration()
    except Exception as e:
        print(f"Script failed: {e}")
        exit(1)