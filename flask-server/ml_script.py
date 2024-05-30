import mysql.connector
import json
from db_con import retrieve_data
import pandas as pd
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
import os
from sklearn.linear_model import LinearRegression
import matplotlib
matplotlib.use('agg')

def update_predictions():
    df = retrieve_data()

    if df is None:
        print("Error: Unable to retrieve data")
        return
    df['DateTime'] = pd.to_datetime(df['DateTime'])
    grouped_data = df.groupby(['BinName', 'DateTime']).size().reset_index(name='count')

    predicted_timestamps = {}

    for bin_name in grouped_data['BinName'].unique():
        bin_data = grouped_data[grouped_data['BinName'] == bin_name]

        # train_data, test_data = train_test_split(bin_data, test_size=0.2, shuffle=False)

        def predict_future_timestamps(bin_data, window=7):
            moving_average = bin_data['count'].rolling(window=window).mean().iloc[-1]
            time_interval = pd.Timedelta(days=1) / moving_average

            last_timestamp = bin_data['DateTime'].max()
            future_timestamps = [(last_timestamp + (i * time_interval)).strftime('%Y-%m-%d %H:%M:%S') for i in range(1, 3)]
            return future_timestamps

        predicted_timestamps[bin_name] = predict_future_timestamps(bin_data.copy(), window=7)  # Adjust window size as needed
        return predicted_timestamps
    
    with open('predicted_timestamps.json', 'w') as f:
        json.dump(predicted_timestamps, f)

    print("Predicted timestamps saved to predicted_timestamps.json")


