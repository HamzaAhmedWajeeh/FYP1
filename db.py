import pyodbc
import random
from datetime import datetime, timedelta

# Connect to the SQL Server database
connection_string = 'DRIVER={SQL Server};SERVER=LP-024\SQLEXPRESS;DATABASE=LifeLinedb;Trusted_Connection=yes;'
connection = pyodbc.connect(connection_string)
cursor = connection.cursor()

# Hospital foreign key values
hospital_ids = [9, 11, 15, 17, 21, 23, 24]

# Blood groups
blood_groups = ['A+', 'B+', 'AB+', 'A-']

# Generate and execute INSERT statements for each day in the date range
start_date = datetime(2023, 12, 16)
end_date = datetime(2024, 1, 1)

current_date = start_date
while current_date < end_date:
    for hospital_id in hospital_ids:
        for blood_group in blood_groups:
            # Generate a random quantity of bottles (you can adjust the range as needed)
            bottles_available = random.randint(1, 20)

            # Format the date and time
            formatted_date = current_date.strftime('%Y-%m-%d')
            formatted_time = current_date.strftime('%H:%M:%S')

            # Insert data into Blood_Availability table
            insert_query = f"""
                INSERT INTO Blood_Availability (BA_H_ID, BA_BloodGroup, BA_BottlesAvailable, BA_Date, BA_Time)
                VALUES ({hospital_id}, '{blood_group}', {bottles_available}, '{formatted_date}', '{formatted_time}')
            """
            cursor.execute(insert_query)
            connection.commit()

    # Move to the next day
    current_date += timedelta(days=1)

# Close the database connection
connection.close()