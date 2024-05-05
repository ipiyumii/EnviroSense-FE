import json
import pandas as pd
from sklearn.model_selection import train_test_split

predicted_timestamps = {}


def update_predictions():
    global predicted_timestamps
    df = pd.read_csv('WasteManagementData.csv')

    df['date'] = pd.to_datetime(df['date'])

    grouped_data = df.groupby(['bin_no', 'date']).size().reset_index(name='count')
    
    for bin_name in grouped_data['bin_no'].unique():
        bin_data = grouped_data[grouped_data['bin_no'] == bin_name]

        train_data, test_data = train_test_split(bin_data, test_size=0.2, shuffle=False)

        def predict_future_timestamps(bin_data, window=7):
            moving_average = bin_data['count'].rolling(window=window).mean().iloc[-1]

            time_interval = pd.Timedelta(days=1) / moving_average

            predicted_timestamps = [train_data['date'].max() + (i * time_interval) for i in range(1, len(test_data) + 1)]
    
            return [ts.strftime('%Y-%m-%d %H:%M:%S') for ts in predicted_timestamps]

        predicted_timestamps[bin_name] = predict_future_timestamps(bin_data.copy(), window=7)

    # Save predicted timestamps to a JSON file
    with open('predicted_timestamps.json', 'w') as f:
        json.dump(predicted_timestamps, f)

    print("Predicted timestamps saved to predicted_timestamps.json")
