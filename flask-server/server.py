
import json
from ml_script import update_predictions, generate_weekly_charts, detect_anomalies
from flask import Flask, render_template, jsonify
import pandas as pd

app = Flask(__name__)

@app.route('/data')
def data():
    update_predictions()

    with open('predicted_timestamps.json', 'r') as f:
        predicted_timestamps = json.load(f)

    df = pd.read_csv('WasteManagementData.csv')

    weekly_image_paths = generate_weekly_charts(df)
    anomalies = {}
    grouped_data = df.groupby(['bin_no', 'date']).size().reset_index(name='count')
    for bin_name in grouped_data['bin_no'].unique():
        bin_data = grouped_data[grouped_data['bin_no'] == bin_name].copy()
        anomalies[bin_name] = detect_anomalies(bin_data)

    predictions = {}
    for bin_name, timestamps in predicted_timestamps.items():
        times_list = [timestamp.split()[1] for timestamp in timestamps]
        predictions[bin_name] = times_list

    return jsonify({"predictions": predictions,"image_paths": weekly_image_paths,"anomalies":anomalies})

if __name__ == '__main__':
    app.run(debug=True)


