from smartapi import SmartConnect, SmartWebSocket
import pyotp
from nsetools import Nse
import requests
from nsepy import get_history, history
from datetime import date
import datetime
import json
import pandas as pd
import io


def getlivefeed(feedToken, personal_data):

    # feed_token=092017047
    FEED_TOKEN = feedToken
    CLIENT_CODE = personal_data['angel_code']
    # token="mcx_fo|224395"
    # SAMPLE: nse_cm|2885&nse_cm|1594&nse_cm|11536&nse_cm|3045
    token = "nse_cm|2885&nse_cm"
    # token="mcx_fo|226745&mcx_fo|220822&mcx_fo|227182&mcx_fo|221599"
    task = "mw"   # mw|sfi|dp

    ss = SmartWebSocket(FEED_TOKEN, CLIENT_CODE)

    def on_message(ws, message):
        print("Ticks: {}".format(message))

    def on_open(ws):
        print("on open")
        ss.subscribe(task, token)

    def on_error(ws, error):
        print(error)

    def on_close(ws):
        print("Close")

    # Assign the callbacks.
    ss._on_open = on_open
    ss._on_message = on_message
    ss._on_error = on_error
    ss._on_close = on_close

    ss.connect()


def read_data():
    try:
        df = pd.read_excel(
            'C:\\Users\\arunm\\OneDrive\\Desktop\\journal\\my-app\\src\\Data\\stockdata.xlsx', 'stockdata')
    # print(df.set_index('symbol')['token'].to_dict())
        # df = df.replace({np.nan: None})

        return(df.to_json(orient="records"))
    except Exception as e:
        print(e)
        data = requests.get(
            'https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json').json()

        return data


def get_nifty_fifty_stocks_ohl():

    df = pd.read_excel(
        'C:\\Users\\arunm\\OneDrive\\Desktop\\journal\\my-app\\src\\Data\\niftydata.xlsx')

    # url = 'https://archives.nseindia.com/content/indices/ind_nifty50list.csv'
    # z = requests.get(url).content
    # df = pd.read_csv(io.StringIO(z.decode('utf-8')))
    # stk_lst = []

    nse = Nse()
    op = []
    for i in df.Symbol:
        # print(i)
        stk_data = nse.get_quote(str(i))
        if int(stk_data['dayHigh']) == int(stk_data['open']):
            op.append({'symbol': i, 'pos': 'open-high',
                      'open': stk_data['open'], 'high': stk_data['dayHigh'], 'ltp': stk_data['lastPrice'], 'low': stk_data['dayLow']})
        elif int(stk_data['dayLow']) == int(stk_data['open']):
            op.append({'symbol': i, 'pos': 'open-low',
                      'open': stk_data['open'], 'low': stk_data['dayLow'], 'ltp': stk_data['lastPrice'], 'high': stk_data['dayHigh']})

    return op


def findohl(symbols):

    nse = Nse()
    op = []
    for i in symbols:
        stk_data = nse.get_quote(str(i))
        if int(stk_data['dayHigh']) == int(stk_data['open']):
            op.append({'symbol': i, 'pos': 'open-high',
                      'open': stk_data['open'], 'high': stk_data['dayHigh'], 'ltp': stk_data['lastPrice'], 'low': stk_data['dayLow']})
        elif int(stk_data['dayLow']) == int(stk_data['open']):
            op.append({'symbol': i, 'pos': 'open-low',
                      'open': stk_data['open'], 'low': stk_data['dayLow'], 'ltp': stk_data['lastPrice'], 'high': stk_data['dayHigh']})

    return op


# def findohl(symbols):
#     print(symbols)
#     personal_data = {
#         'angel_code': 'P205239',
#         'Api_key': 'NZkxURxG',
#         'pswd': '3773',
#         'otpkey': "YSSC6X4LGTKQMBIRE56FCZZI44"}

#     obj = SmartConnect(api_key=personal_data['Api_key'])
#     # optional
#     #access_token = "your access token",
#     # refresh_token = "your refresh_token")
#     data = obj.generateSession(personal_data['angel_code'], personal_data['pswd'], pyotp.TOTP(
#         personal_data['otpkey']).now())
#     refreshToken = data['data']['refreshToken']
#     feedToken = obj.getfeedToken()
#     op = []
#     # z = obj.getProfile(refreshToken)
#     for i in symbols:

#         z = {
#             "exchange": "NSE",
#             "symboltoken": symbols[i],
#             "interval": "FIVE_MINUTE",
#             # "fromdate": f"{str(tod).split(' ')[0]} 09:15",
#             # "todate": f"{str(tod).split(' ')[0]} 10:00",
#             "fromdate": "2023-03-16 09:15",
#             "todate": "2023-03-16 09:15"

#         }
#         # [timestamp, open, high, low, close, volume].

    # if int(stk_data['data'][0][1]) == int(stk_data['data'][0][2]):
    #     print('oh')
    #     op.append({i: symbols[i], 'pos': 'open-high',
    #               'open': stk_data['data'][0][1], 'high': stk_data['data'][0][2]})
    # elif int(stk_data['data'][0][1]) == int(stk_data['data'][0][3]):
    #     op.append({i: symbols[i], 'pos': 'open-low',
    #               'open': stk_data['data'][0][1], 'low': stk_data['data'][0][3]})

    #     print('ol')

#     # print(symbols)
#     return op

# def buy_order():


def sell_order(params):

    price = params['price']
    data = params['stockdata']
    symbol = data['symbol']
    token = data['token']
    exg = data['exch_seg']
    targetPrice = params['targetPrice']
    sellPrice = params['sellPrice']
    quantity = params['quantity']
    triggerPrice = params['triggerPrice']
    stopLoss = params['stopLoss']

    personal_data = {
        'angel_code': 'P205239',
        'Api_key': 'NZkxURxG',
        'pswd': '3773',
        'otpkey': "YSSC6X4LGTKQMBIRE56FCZZI44"}
    print(params)
    obj = SmartConnect(api_key=personal_data['Api_key'])

    data = obj.generateSession(personal_data['angel_code'], personal_data['pswd'], pyotp.TOTP(
        personal_data['otpkey']).now())
    refreshToken = data['data']['refreshToken']
    feedToken = obj.getfeedToken()
    orderparams = {
        "variety": "NORMAL",
        "tradingsymbol": symbol,
        "symboltoken": token,
        "transactiontype": "SELL",
        "exchange": exg,
        "ordertype": "LIMIT",
        "producttype": "INTRADAY",
        "duration": "DAY",
        "price": str(sellPrice),
        "squareoff": str(targetPrice),
        'triggerprice': str(triggerPrice),
        "stoploss": str(stopLoss),
        "quantity": str(quantity),

    }
    orderId = obj.placeOrder(orderparams)

    return orderId


def buy_order(params):
    # print(params)

    price = params['price']
    data = params['stockdata']
    symbol = data['symbol']
    token = data['token']
    exg = data['exch_seg']
    targetPrice = params['targetPrice']
    buyPrice = params['buyPrice']
    quantity = params['quantity']
    triggerPrice = params['triggerPrice']
    stopLoss = params['stopLoss']

    personal_data = {
        'angel_code': 'P205239',
        'Api_key': 'NZkxURxG',
        'pswd': '3773',
        'otpkey': "YSSC6X4LGTKQMBIRE56FCZZI44"}
    # # print(params)
    obj = SmartConnect(api_key=personal_data['Api_key'])

    data = obj.generateSession(personal_data['angel_code'], personal_data['pswd'], pyotp.TOTP(
        personal_data['otpkey']).now())
    refreshToken = data['data']['refreshToken']
    feedToken = obj.getfeedToken()
    orderparams = {
        "variety": "NORMAL",
        "tradingsymbol": symbol,
        "symboltoken": token,
        "transactiontype": "BUY",
        "exchange": exg,
        "ordertype": "LIMIT",
        "producttype": "INTRADAY",
        "duration": "DAY",
        "price": str(buyPrice),
        "squareoff": str(targetPrice),
        'triggerprice': str(triggerPrice),
        "stoploss": str(stopLoss),
        "quantity": str(quantity),

    }
    orderId = obj.placeOrder(orderparams)

    return orderId


def get_position_data():
    personal_data = {
        'angel_code': 'P205239',
        'Api_key': 'NZkxURxG',
        'pswd': '3773',
        'otpkey': 'YSSC6X4LGTKQMBIRE56FCZZI44'}
    obj = SmartConnect(api_key=personal_data['Api_key'])
    data = obj.generateSession(personal_data['angel_code'], personal_data['pswd'], pyotp.TOTP(
        personal_data['otpkey']).now())
    refreshToken = data['data']['refreshToken']
    feedToken = obj.getfeedToken()
    z = obj.position()
    return z


def get_order_details(params):
    print(params)

    personal_data = {
        'angel_code': 'P205239',
        'Api_key': 'NZkxURxG',
        'pswd': '3773',
        'otpkey': "YSSC6X4LGTKQMBIRE56FCZZI44"}
    # # print(params)
    obj = SmartConnect(api_key=personal_data['Api_key'])

    data = obj.generateSession(personal_data['angel_code'], personal_data['pswd'], pyotp.TOTP(
        personal_data['otpkey']).now())
    refreshToken = data['data']['refreshToken']
    feedToken = obj.getfeedToken()
    order_details = obj.orderBook()
    for i in order_details['data']:
        if i['orderid'] == str(params['orderId']):
            return {'status': i['status'], 'message': i['text'], 'orderId': i['orderid']}

    # data = obj.generateSession(personal_data['angel_code'], personal_data['pswd'], pyotp.TOTP(
    #     personal_data['otpkey']).now())
    # refreshToken = data['data']['refreshToken']
    # feedToken = obj.getfeedToken()

    # z = obj.getProfile(refreshToken)

    # print(z)

    # refreshtoken=params['refreshtoken']
    # for i in params:
    #     print(i)


def getdata(params):

    ma = 10
    tod = datetime.datetime.now()
    d = datetime.timedelta(days=ma)
    a = tod - d
    if a.strftime("%A") == "Saturday":
        d = datetime.timedelta(days=ma+1)
        a = tod - d
        data = get_history(symbol=params, start=date(
            int(a.strftime('%Y')), int(a.strftime('%m')), int(a.strftime('%d'))), end=date(int(tod.strftime('%Y')), int(tod.strftime('%m')), int(tod.strftime('%d'))))
        return data

    elif a.strftime("%A") == "Sunday":
        d = datetime.timedelta(days=ma+2)
        a = tod - d
        data = get_history(symbol=params, start=date(
            int(a.strftime('%Y')), int(a.strftime('%m')), int(a.strftime('%d'))), end=date(int(tod.strftime('%Y')), int(tod.strftime('%m')), int(tod.strftime('%d'))))
        return data
    else:
        data = get_history(symbol=params, start=date(
            int(a.strftime('%Y')), int(a.strftime('%m')), int(a.strftime('%d'))), end=date(int(tod.strftime('%Y')), int(tod.strftime('%m')), int(tod.strftime('%d'))))
        return data


def getma(params):
    lst = []
    data = getdata(str(params))
    # data = get_history(symbol=str(params), start=date(
    #     2023, 3, 1), end=date(2023, 3, 13))
    init = 0
    count = 0
    for i in data.index:
        init = init+data['Close'][i]
        count = count+1

    avg = init/count
    return avg


def gettop_gainers():
    nse = Nse()
    top_gainers = nse.get_top_gainers()
    for i in top_gainers:
        i['ma'] = getma(i['symbol'])
    # print(top_gainers)
    return top_gainers


def gettop_loosers():
    nse = Nse()
    loosers = nse.get_top_losers()
    for i in loosers:
        i['ma'] = getma(i['symbol'])

    return loosers


def get_stock_data(params):
    print(params)
    op = []
    for i in params['data']:
        nse = Nse()
        q = nse.get_quote(str(i))
        op.append(q)
    return op


def writeJson(data):
    # print("############################", data['data'])
    # yesterday_gainer = data['data']['yesterdaygainers']
    with open("C:\\Users\\arunm\\OneDrive\\Desktop\\journal\\my-app\\src\\Data\\data.json", 'w') as f:
        json.dump(data['data'], f)

    return {'status': 'Success'}


def readJson():
    # yesterday_gainer = data['data']['yesterdaygainers']
    url = 'https://archives.nseindia.com/content/indices/ind_nifty50list.csv'
    z = requests.get(url).content
    df = pd.read_csv(io.StringIO(z.decode('utf-8')))
    df.to_excel(
        'C:\\Users\\arunm\\OneDrive\\Desktop\\journal\\my-app\\src\\Data\\niftydata.xlsx')

    with open("C:\\Users\\arunm\\OneDrive\\Desktop\\journal\\my-app\\src\\Data\\data.json", 'r') as f:
        data = f.read()
        # print(data)
        return data


def login():
    personal_data = {
        'angel_code': 'P205239',
        'Api_key': 'NZkxURxG',
        'pswd': '3773',
        'otpkey': "YSSC6X4LGTKQMBIRE56FCZZI44"}

    obj = SmartConnect(api_key=personal_data['Api_key'])
    # optional
    #access_token = "your access token",
    # refresh_token = "your refresh_token")
    data = obj.generateSession(personal_data['angel_code'], personal_data['pswd'], pyotp.TOTP(
        personal_data['otpkey']).now())
    refreshToken = data['data']['refreshToken']
    feedToken = obj.getfeedToken()

    # historicParam = {
    #     "exchange": "NSE",
    #     "symboltoken": "3045",
    #     "interval": "ONE_MINUTE",
    #     "fromdate": "2021-03-12 09:00",
    #     "todate": "2021-03-12 09:16"
    # }
    # # obj.getCandleData(historicParam)
    # d = obj.getCandleData(historicParam)
    # print(d)
    if feedToken:
        return {'status': 'Success', 'token': feedToken, 'refreshtoken': refreshToken}
    else:
        return {'status': 'Failed'}
    return(feedToken)


def main(personal_data):

    # print(personal_data)
    feedToken = login(personal_data)

    # data = {
    #     "exchange": "NSE",
    #     "tradingsymbol": "SBIN-EQ",
    #     "symboltoken": "3045"
    # }

    # getlivefeed(feedToken,personal_data)


# if __name__ == "__main__":


#     main(personal_data)
