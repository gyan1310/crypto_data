from flask import Flask, jsonify
import yfinance as yf
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/btc_data')
def get_btc_data():
    symbol = "btcusd"
    start_date = "2024-01-01"
    end_date = "2024-04-15"
    interval = "1d"
    btc_data = yf.download("btc-usd", "2024-04-01", "2024-04-05", "id")
    btc_data_dict = btc_data.to_dict(orient='index')
    # Convert Timestamp keys to strings
    btc_data_dict = {str(key): value for key, value in btc_data_dict.items()}
    
    return jsonify(btc_data_dict)

if __name__ == '__main__':
    app.run(debug=True)
