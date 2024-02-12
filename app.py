import pyodbc
import random
import string

server = 'LP-024\SQLEXPRESS'
database = 'LifeLinedb'

conn = pyodbc.connect(f'DRIVER={{SQL Server}};SERVER={server};DATABASE={database};Trusted_Connection=yes')
cursor = conn.cursor()

for i in range(1, 10001):
    p_name = 'Patient' + ''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase, k=2))
    p_dob = f'{random.randint(1950, 2000)}-{random.randint(1, 12):02d}-{random.randint(1, 28):02d}'
    p_mobile = ''.join(random.choices(string.digits, k=8))
    p_date = f'2023-{random.randint(1, 12):02d}-{random.randint(1, 28):02d}'
    p_time = f'{random.randint(0, 23):02d}:{random.randint(0, 59):02d}:00.0000000'
    p_a_status = random.choice(['Active', 'Inactive'])
    p_reason = 'Reason for appointment ' + ''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase, k=8))
    p_email = f'patient{i}@example.com'
    p_password = 'hashed_password' + ''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase, k=3))
    p_d_id = 36

    sql = f"INSERT INTO Patients (P_D_ID, P_Name, P_DOB, P_Mobile, P_Date, P_Time, P_A_Status, P_Reason, P_Email, P_Password) " \
          f"VALUES ({p_d_id}, '{p_name}', '{p_dob}', '{p_mobile}', '{p_date}', '{p_time}', '{p_a_status}', '{p_reason}', '{p_email}', '{p_password}')"

    cursor.execute(sql)

conn.commit()
conn.close()
