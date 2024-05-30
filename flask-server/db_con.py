from flask import Flask, request
import json
import mysql.connector
import pandas as pd
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash

def insert_data(data):
    try:
        connection = mysql.connector.connect(
            user = 'root',
            password = 'root',
            host = 'localhost',
            port = 3306,
            database = 'EnviroSenseAI_db'
        )
        if connection.is_connected():
            print("connected!") 
    
        cur = connection.cursor()
        for bin_id, timestamps in data.items():
            query = "SELECT BinName FROM bins WHERE BinID = %s"
            cur.execute(query, (bin_id,))
            bin_name = cur.fetchone()[0]

            for timestamp in timestamps:
                query = "INSERT INTO sensor_data (binID,DateTime, BinName) VALUES (%s, %s, %s)"
                cur.execute(query, (bin_id,timestamp,bin_name))     
                       
        connection.commit()
        return True

    except Exception as e:
        print(f"Error occurred: {e}")
        return False

    finally:
        cur.close()
        connection.close()


def retrieve_data():
    try:
        connection = mysql.connector.connect(
            user='root',
            password='root',
            host='localhost',
            port=3306,
            database='EnviroSenseAI_db'
        )
        if connection.is_connected():
            print("connected!") 
    
        cur = connection.cursor(dictionary=True)
        
        # query = "SELECT binID, DateTime, BinName FROM sensor_data"
        # cur.execute(query)

         # get the current date
        end_date = datetime.now().date()
        
        # calculate the start date 
        start_date = end_date - timedelta(days=7)
        
        # convert dates to strings
        start_date_str = start_date.strftime('%Y-%m-%d')
        end_date_str = end_date.strftime('%Y-%m-%d')

        query = f"SELECT binID, DateTime, BinName FROM sensor_data WHERE DateTime BETWEEN '{start_date_str}' AND '{end_date_str}'"
        cur.execute(query)
        
        data = cur.fetchall()
        
        df = pd.DataFrame(data)
        df['DateTime'] = pd.to_datetime(df['DateTime'])
        print(df)
    
        return df

    except Exception as e:
        print(f"Error occurred: {e}")
        return None

    finally:
        cur.close()
        connection.close()


def get_user(user):
    connection = None
    cur = None

    try:
        connection = mysql.connector.connect(
            user='root',
            password='root',
            host='localhost',
            port=3306,
            database='EnviroSenseAI_db'
        )
        if connection.is_connected():
            print("connected!") 
        
        cur = connection.cursor(dictionary=True)

        query = "SELECT * FROM Admin WHERE username = %s"
        cur.execute(query, (user,))     
        userData = cur.fetchone()

        if user:
            print("User exists")
            return userData
        else:
            print("User does not exist")
            return False
        
    except Exception as e:
        print(f"Error: {e}")
        return False

    finally:
        if cur:
            cur.close()
        if connection and connection.is_connected():
            connection.close()
            print("MySQL connection is closed in getUser")


    
def insert_user(data):
    connection = None
    cur = None
    try:
        connection = mysql.connector.connect(
            user='root',
            password='root',
            host='localhost',
            port=3306,
            database='EnviroSenseAI_db'
        )
        # if connection.is_connected():
        #     print("connected!") 
        
        # cur = connection.cursor(dictionary=True)

        with connection.cursor(dictionary=True) as cur:

            email = data.get('email')
            username = data.get('username')

            query = "SELECT * FROM Admin WHERE email = %s"
            cur.execute(query, (email,))
            user = cur.fetchone()
            cur.fetchall() 

            if user:
                print("User already exists")
                return {"message": "This email is already used!"},400           
           
            else: 
                query = "SELECT * FROM Admin WHERE username = %s"
                cur.execute(query, (username,))
                user = cur.fetchone()
                cur.fetchall()

                if user:
                    print("username has already taken!")
                    return {"message": "username has already taken!"},400


                else:
                    phone = data.get('phone')
                    # username = data.get('username')
                    password = data.get('password')
                    password_hash = generate_password_hash(password) if password else None


                    query = "INSERT INTO Admin (email,phone, username,password) VALUES (%s, %s, %s, %s)"
                    cur.execute(query, (email, phone, username, password_hash))     

                    connection.commit()
                    print("Record inserted successfully into Admin table")
                    return {"message": "User registered successfully"}, 200
            
    except Exception as e:
        print(f"Error: {e}")
        return False

    finally:
        if cur:
            cur.close()
        if connection and connection.is_connected():
            connection.close()
            print("MySQL connection is closed in insertUser")

   