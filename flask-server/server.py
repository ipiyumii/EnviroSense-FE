from flask import Flask, jsonify
import json
from ml_script import update_predictions 

app = Flask(__name__)

@app.route('/data')
def data():
    # Update predictions
    update_predictions()

    # Load the data from the JSON file
    with open('predicted_timestamps.json', 'r') as f:
        predicted_timestamps = json.load(f)

    # Create a dictionary to store the predicted times for each bin
    predictions = {}

    # Extract times for each bin
    for bin_name, timestamps in predicted_timestamps.items():
        times_list = [timestamp.split()[1] for timestamp in timestamps]
        predictions[bin_name] = times_list


    # # Define the paths to the image files
    # image_paths = [
    #     'static/images/week_1.png',
    #     'static/images/week_2.png',
    #     'static/images/week_3.png',
    #     # Add more image paths for additional weeks
    # ]

    return jsonify({"predictions": predictions})

if __name__ == '__main__':
    app.run(debug=True)
