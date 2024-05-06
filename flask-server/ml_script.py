import json
import pandas as pd
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
import os
from sklearn.linear_model import LinearRegression

import matplotlib
matplotlib.use('agg')

def update_predictions():
    predicted_timestamps = {}

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


def generate_weekly_charts(df):
    df['date'] = pd.to_datetime(df['date'])

    weekly_data = df.groupby([pd.Grouper(key='date', freq='W'), 'bin_no']).size().unstack(fill_value=0)

    os.makedirs("static/images", exist_ok=True)

    week_count = 1
    image_paths = []

    # for week, data in weekly_data.iterrows():
    #     fig, ax = plt.subplots(figsize=(10, 6))
    #     data.plot(kind='bar', ax=ax)
    #     ax.set_title(f'Fill Levels of Bins for Week {week_count}')
    #     ax.set_xlabel('Bin No')
    #     ax.set_ylabel('Fill Level Count')
    #     ax.set_xticklabels(data.index, rotation=45)
    #     fig.tight_layout()
    #     image_path = f'static/images/week_{week_count}.png'
    #     fig.savefig(image_path)  # Save the chart as an image with a transparent background
    #     plt.close(fig)  # Close the plot to free up memory
    #     image_paths.append(image_path)
    #     week_count += 1

      # Weekly Fill Level Summary Chart
    plt.figure(figsize=(10, 6))
    weekly_data.plot(kind='bar', stacked=True)
    plt.title('Weekly Fill Level Summary Charts')
    plt.xlabel('Week')
    plt.ylabel('Fill Level')
    plt.xticks(range(len(weekly_data.index)), [f'Week {i}' for i in range(1, len(weekly_data.index) + 1)], rotation=45)
    plt.tight_layout()
    image_path = 'static/images/weekly_fill_level_summary.png'
    plt.savefig(image_path)
    image_paths.append(image_path)
  

# # Plot separate graphs for each bin
#     bins = df['bin_no'].unique()
#     for bin_name in bins:
#         bin_data = df[df['bin_no'] == bin_name]
#         plt.figure(figsize=(10, 6))
#         plt.plot(bin_data['date'], bin_data['count'], marker='o')
#         plt.title(f'Garbage Collection Frequency for Bin {bin_name}')
#         plt.xlabel('Date')
#         plt.ylabel('Frequency')
#         plt.grid(True)
#         plt.xticks(rotation=45)
#         plt.tight_layout()
#         image_path = f'static/images/garbage_collection_frequency_bin_{bin_name}.png'
#         plt.savefig(image_path)
#         plt.close()
#         image_paths.append(image_path)

    return image_paths


def detect_anomalies(bin_data):
    reference_date = bin_data['date'].min()
    bin_data['days_since_ref'] = (bin_data['date'] - reference_date).dt.days

    regression_model = LinearRegression()
    regression_model.fit(bin_data[['days_since_ref']], bin_data['count'])  # Train on days and count

    bin_data['predicted_count'] = regression_model.predict(bin_data[['days_since_ref']])

    bin_data['residuals'] = bin_data['count'] - bin_data['predicted_count']

    threshold = bin_data['residuals'].std() * 3  # Adjust threshold as needed
    bin_data['anomaly'] = bin_data['residuals'].abs() > threshold

    if bin_data['anomaly'].any():
        prediction = f"Suggest changing the bin {bin_data['bin_no'].iloc[0]} due to increasing trash amount. (කුනු බදුන වෙනස් කල යුතුයි)"
    else:
        prediction = f"Suggest to use the same bin for bin {bin_data['bin_no'].iloc[0]}. (කුනු බදුන වෙනස් කල යුතු නැත)"

    return [prediction]



def main():
    df = pd.read_csv('WasteManagementData.csv')
    generate_weekly_charts(df)
    update_predictions()
    grouped_data = df.groupby(['bin_no', 'date']).size().reset_index(name='count')
    predictions = {}
    for bin_name in grouped_data['bin_no'].unique():
        bin_data = grouped_data[grouped_data['bin_no'] == bin_name].copy()
        prediction = detect_anomalies(bin_data)
        predictions[bin_name] = prediction
        print(bin_name, prediction)  # Print bin name and prediction

    with open('predictions.json', 'w') as f:
        json.dump(predictions, f)

if __name__ == "__main__":
    main()

