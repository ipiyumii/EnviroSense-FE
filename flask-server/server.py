from flask import Flask, request ,jsonify
from flask_cors import CORS
import json
from db_con import insert_data
import mysql.connector
from ml_script import update_predictions
from db_con import insert_user
from db_con import get_user
from auth import authenticate_user
from google.auth.transport import requests
from google.oauth2 import id_token
import google_auth_oauthlib.flow
import googleapiclient.discovery
# from auth import change_password

# app = Flask(__name__, static_folder='../build', static_url_path='/') 

app = Flask(__name__)
CORS(app)

@app.route('/data', methods=['POST', 'GET'])
def receive_data():
    if request.method == 'POST':
        data = request.json
        print("Received data:", data)
    
        with open("sensor_data.json", "a") as f:
            json.dump(data, f)
            f.write("\n")

        if insert_data(data):
            return "Sensor data processed and stored successfully"
        else:
            return "Error: Data could not be processed", 500    
    elif request.method == 'GET':
            data = update_predictions()
            return jsonify(data)


@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        print("Received data:", data)

        response, status_code = insert_user(data)  
        return jsonify(response), status_code

    except Exception as e:
        print(f"Error in /register route: {e}")
        return jsonify({"message": "Internal server error"}), 500
    

@app.route('/', methods=['POST'])
def login():
    try:
        data = request.get_json()
        print("Received data:", data)

        response, status_code = authenticate_user(data)  
        return jsonify(response), status_code
       
    except Exception as e:
        print(f"Error in /register route: {e}")
        return jsonify({"message": "Internal server error"}), 500
    



@app.route('/google-login', methods=['POST'])
def handle_google_login():
    token = request.json.get('token')
    print(f"Received token: {token}")

    try:
        #change 1
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), "967460610118-g4oul1g5umkiu6heanm2ornah4hektvu.apps.googleusercontent.com")
        print(f"idinfo: {idinfo}")

        userid = idinfo['sub']
        email = idinfo.get('email')
        name = idinfo.get('name')

        user_data = {
            'email': email,
            'username': name,
            'password': None,  
            'phone': ''
        }
        response, status_code = insert_user(user_data)
        return jsonify({"message": "Login successful and user registered"}), status_code

    except ValueError:
        return jsonify({"message": "Invalid token"}), 401

    
if __name__ == '__main__':
    app.run(debug=True)


