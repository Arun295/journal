from flask import Flask, request
import requests
from main import gettop_gainers, gettop_loosers, login, writeJson, readJson, read_data, get_stock_data, sell_order, findohl, buy_order, get_order_details, get_position_data, get_nifty_fifty_stocks_ohl
from flask_socketio import SocketIO
from flask_cors import CORS

app = Flask(__name__)
socketio = SocketIO(app, cors_allowedorigins="*")
CORS(app)


@app.route('/topgainers', methods=['GET', 'POST'])
def get_top_gainers():
    return gettop_gainers()


@app.route('/toploosers', methods=['GET', 'POST'])
def get_top_loosers():
    return gettop_loosers()


# @app.route('/getma', methods=['GET', 'POST'])
# def definema():
#     params = request.get_json()
#     return getma(params['symbol'])


@app.route('/getjsonData', methods=['GET'])
def getjson():
    return readJson()


@app.route('/get_stock_data', methods=['GET', 'POST'])
def get_stock_details():
    params = request.get_json()
    return get_stock_data(params)


@app.route('/get_order_details', methods=['GET', 'POST'])
def get_order_data():
    params = request.get_json()

    return get_order_details(params)


@app.route('/get_nifty_fifty_stocks_ohl', methods=['GET'])
def getniftystocks():
    return get_nifty_fifty_stocks_ohl()


@app.route('/writeYesterdayJsonData', methods=['GET', 'POST'])
def get_json_data():
    params = request.get_json()
    return writeJson(params)


@app.route('/login', methods=['GET', 'POST'])
def get_login():
    return login()


@app.route('/getpositions', methods=['GET', 'POST'])
def get_positions():
    return get_position_data()


@app.route('/sellorder', methods=['GET', 'POST'])
def place_sell_order():
    params = request.get_json()
    return sell_order(params)


@app.route('/buyorder', methods=['GET', 'POST'])
def place_buy_order():
    params = request.get_json()
    return buy_order(params)


@app.route('/getwholedata', methods=['GET', 'POST'])
def read_whole_stock_data():
    return read_data()


@app.route('/findohl', methods=['GET', 'POST'])
def find_open_high_low():
    params = request.get_json()
    return findohl(params)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
