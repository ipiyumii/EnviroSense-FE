from flask import Flask,jsonify

app = Flask(__name__)

@app.route('/data')
def data():
    predictions = [0.85, 0.75, 0.95]  # Sample prediction data
    bin_data = [65, 70, 80]  # Sample bin data
    return jsonify({"predictions": predictions,"binData": bin_data})

if __name__ == '__main__':
    app.run(debug=True)


