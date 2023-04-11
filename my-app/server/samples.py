from nsetools import Nse
from nsepy import get_history, history
from datetime import date
import datetime
import pandas as pd
import requests
from smartapi import SmartConnect, SmartWebSocket
import io
import pyotp
nse = Nse()
import os
import datetime
import holidays
from datetime import timedelta
import time

# data = pd.read_excel('C:\\Users\\arunm\\OneDrive\\Desktop\\journal\\my-app\\src\\Data\\stockdata.xlsx', 'stockdata',
#                      usecols=['symbol', 'token', 'exch_seg'])
# print(data)

# z = requests.get(
#     'https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json').json()
# for i in z:
#     if i['symbol'] == 'SBIN-EQ':
#         print(i)
# init = 0

# ma = 10
tod = datetime.datetime.now()
print(str(tod).split(' ')[0])


# import os
# cwd = os.getcwd()
# print(cwd.split('\\server')[0]+'\\src\\Data')







# d = datetime.timedelta(days=ma)
# a = tod - d
# if a.strftime('%A') == 'Saturday':
#     d = datetime.timedelta(days=ma+1)
#     a = tod - d
#     data = get_history(symbol='SBIN', start=date(
#         int(a.strftime('%Y')), int(a.strftime('%m')), int(a.strftime('%d'))), end=date(int(tod.strftime('%Y')), int(tod.strftime('%m')), int(tod.strftime('%d'))))
#     print(data)

# elif a.intftime('%A') == 'Sunday':
#     d = datetime.timedelta(days=ma+2)
#     a = tod - d
#     data = get_history(symbol='SBIN', start=date(
#         int(a.strftime('%Y')), int(a.strftime('%m')), int(a.strftime('%d'))), end=date(int(tod.strftime('%Y')), int(tod.strftime('%m')), int(tod.strftime('%d'))))
#     print(data)
# else:
#     data = get_history(symbol='SBIN', start=date(
#         int(a.strftime('%Y')), int(a.strftime('%m')), int(a.strftime('%d'))), end=date(int(tod.strftime('%Y')), int(tod.strftime('%m')), int(tod.strftime('%d'))))
#     print(data)


# data = get_history(symbol='SBIN', start=date(
# 2023, 3, 1), end=date(2023, 3, 13))

# data = get_history(symbol='SBIN', start=date(
#     2023, 3, 1), end=date(2023, 3, 13))
# def getma(params):
#     print(params)
#     lst = []
#     data = get_history(symbol=str(params), start=date(
#         2023, 3, 1), end=date(2023, 3, 13))
#     init = 0
#     for i in data.index:
#         init = init+data['Close'][i]

#     avg = init/8
#     print(avg)
#     return avg


# url = 'https://archives.nseindia.com/content/indices/ind_nifty50list.csv'
# z = requests.get(url).content
# df = pd.read_csv(io.StringIO(z.decode('utf-8')))
# q = []
# for i in df.Symbol:
#     print(q.append(i))


# top_gainers = nse.get_stock_codes('NIFTY 50')
# count = 0
# for i in top_gainers:
#     count = count+1
#     print(i, count)


# # for i in data.index:
# #     print((data['Close'][i]))
# #     init = init+data['Close'][i]

# # avg = init/8
# # print(int(avg))


# data = requests.get(
#     'https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json').json()
# print(data)


# df = pd.read_excel(
#     'C:\\Users\\arunm\\OneDrive\\Desktop\\journal\\my-app\\src\\Data\\stockdata.xlsx', 'stockdata')
# # print(df.set_index('symbol')['token'].to_dict())
# print(df.to_dict('r'))

# q = nse.get_quote('infy')
# print(q)


# personal_data = {
#     'angel_code': 'P205239',
#     'Api_key': '9HQ5oCyi',
#     'pswd': '3773',
#     'otpkey': 'YSSC6X4LGTKQMBIRE56FCZZI44'}

# obj = SmartConnect(api_key=personal_data['Api_key'])
# # optional
# #access_token = 'your access token',
# # refresh_token = 'your refresh_token')
# data = obj.generateSession(personal_data['angel_code'], personal_data['pswd'], pyotp.TOTP(
#     personal_data['otpkey']).now())
# refreshToken = data['data']['refreshToken']
# feedToken = obj.getfeedToken()
# # z = obj.getProfile(refreshToken)


# z = {
#     'exchange': 'NSE',
#     'symboltoken': '3045',
#     'interval': 'FIVE_MINUTE',
#     'fromdate': f'{str(tod).split(' ')[0]} 09:15',
#     'todate': f'{str(tod).split(' ')[0]} 10:00'

# }


# z = obj.getCandleData(z)
# print(z)


def placeorder():
    price = 524
    # symbol = data['symbol']
    # token = data['token']
    # exg = data['exch_seg']
    targetPrice = 203,
    sellPrice = str(210.7)

    personal_data = {
        'angel_code': 'P205239',
        'Api_key': '9HQ5oCyi',
        'pswd': '3773',
        'otpkey': 'YSSC6X4LGTKQMBIRE56FCZZI44'}
    obj = SmartConnect(api_key=personal_data['Api_key'])
    data = obj.generateSession(personal_data['angel_code'], personal_data['pswd'], pyotp.TOTP(
        personal_data['otpkey']).now())
    # refreshToken = data['data']['refreshToken']
    feedToken = obj.getfeedToken()

    # orderId = obj.placeOrder(orderparams)

    try:
        # orderparams = {
        #     'variety': 'STOPLOSS',
        #     'tradingsymbol': 'SBIN-EQ',
        #     'symboltoken': '3045',
        #     'transactiontype': 'BUY',
        #     'exchange': 'NSE',
        #     'ordertype': 'STOPLOSS_LIMIT',
        #     'producttype': 'INTRADAY',
        #     'duration': 'DAY',
        #     'price': price,
        #     'squareoff': '525',
        #     'triggerprice': '523.9',
        #     'stoploss': '523.5',
        #     'quantity': '1'

        # }
        # # orderparams = {
        # #     'variety': 'NORMAL',
        # #     'tradingsymbol': 'SBIN-EQ',
        # #     'symboltoken': '3045',
        # #     'transactiontype': 'BUY',
        # #     'exchange': 'NSE',
        # #     'ordertype': 'LIMIT',
        # #     'producttype': 'INTRADAY',
        # #     'duration': 'DAY',
        # #     'price': '19500',
        # #     'squareoff': '0',
        # #     'stoploss': '0',
        # #     'quantity': '1'
        # # }
        # orderId = obj.placeOrder(orderparams)
        z = obj.position()

        print('The order id is: {}'.format(z))
    except Exception as e:
        print('Order placement failed: {}'.format(e.message))

    return(z)


# print(placeorder())
# url = 'https://archives.nseindia.com/content/indices/ind_nifty50list.csv'
# z = requests.get(url).content
# df = pd.read_csv(io.StringIO(z.decode('utf-8')))p
# df = pd.read_excel(
#     'C:\\Users\\arunm\\OneDrive\\Desktop\\journal\\my-app\\src\\Data\\niftydata.xlsx')

# nse = Nse()
# op = []
# for i in df.Symbol:
#     print(i)
#     stk_data = nse.get_quote(str(i))
#     if int(stk_data['dayHigh']) == int(stk_data['open']):
#         op.append({'symbol': i, 'pos': 'open-high',
#                   'open': stk_data['open'], 'high': stk_data['dayHigh'], 'ltp': stk_data['lastPrice'], 'low': stk_data['dayLow']})
#     elif int(stk_data['dayLow']) == int(stk_data['open']):
#         op.append({'symbol': i, 'pos': 'open-low',
#                   'open': stk_data['open'], 'low': stk_data['dayLow'], 'ltp': stk_data['lastPrice'], 'high': stk_data['dayHigh']})

# print(op)
# from jugaad_data.nse import NSELive
# n = NSELive()
# q = n.stock_quote("HDFC")
# print(q['priceInfo'])

# import requests

# session = requests.session()

# head = {
#     "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
#                   "Chrome/87.0.4280.88 Safari/537.36 "
# }


# def getId(name):
#     search_url = 'https://www.nseindia.com/api/search/autocomplete?q={}'
#     get_details = 'https://www.nseindia.com/api/quote-equity?symbol={}'
#     session.get('https://www.nseindia.com/', headers=head)
#     search_results = session.get(url=search_url.format(name), headers=head)
#     search_result = search_results.json()['symbols'][0]['symbol']

#     company_details = session.get(url=get_details.format(search_result), headers=head)
#     return company_details.json()['info']['identifier']

# print(getId('tata motors'))

def login():
    personal_data = {
        'angel_code': 'P205239',
        'Api_key': 'heInmbVF',
        'pswd': '3773',
        'otpkey': 'YSSC6X4LGTKQMBIRE56FCZZI44'}

    obj = SmartConnect(api_key=personal_data['Api_key'])
    # optional
    #access_token = 'your access token',
    # refresh_token = 'your refresh_token')
    data = obj.generateSession(personal_data['angel_code'], personal_data['pswd'], pyotp.TOTP(
        personal_data['otpkey']).now())
    refreshToken = data['data']['refreshToken']
    feedToken = obj.getfeedToken()
    # today_date=str(tod).split(' ')[0]
    # hrs=str(tod).split(' ')[1].split(':')[0]
    # mins=str(tod).split(' ')[1].split(':')[1]

    # print(str(tod).split(' ')[1].split(':'))

    
    
    day=datetime.date.today()
    tod = datetime.datetime.now()
    today_date=str(tod).split(' ')[0]
    hrs=str(tod).split(' ')[1].split(':')[0]
    mins=str(tod).split(' ')[1].split(':')[1]
    yesterday=day-timedelta(days=1)
    day_before_yesterday = day - timedelta(days = 2)
    leave = holidays.India()
    print(yesterday.strftime('%A'),hrs,mins)
    z=725-723

    high_percentage_range=700*(0.5/100)
    low_percentage_range=700*(0.2/100)
    if(z>low_percentage_range and z<high_percentage_range):
        print('True',high_percentage_range,z,low_percentage_range)
    else:
        print('false',high_percentage_range,z,low_percentage_range)



    # if(yesterday.strftime('%A') == 'Saturday' or yesterday.strftime('%A') == 'Sunday'):
    #     if yesterday.strftime('%A') == 'Saturday':
    #             yesterday = yesterday - timedelta(days = 1)
    #     if yesterday.strftime('%A') == 'Sunday':
    #             yesterday = yesterday - timedelta(days = 2)
    #     if(yesterday in leave):
    #              print(yesterday,'is leave shifting day before')
    #              yesterday = yesterday - timedelta(days = 1)
    # yesterday = yesterday - timedelta(days = 2)

    # print(yesterday,yesterday.strftime('%A'))
    # historicParam={
    #                 "exchange": "NSE",
    #                 "symboltoken": "3045",
    #                 "interval": "ONE_DAY",
    #                 "fromdate": f"{str(yesterday)} 09:15", 
    #                 "todate": f"{today_date} {hrs}:{mins}"
    #                 }
    # z=obj.getCandleData(historicParam)

    # print("yesterday",z)
                #  if yesterday.strftime('%A') == 'Saturday':
                #         yesterday = yesterday - timedelta(days = 1)
                #  elif yesterday.strftime('%A') == 'Sunday':
                #         yesterday = yesterday - timedelta(days = 2)
    #     else:
    #          print('yesterday not in leave and not sat and sun ')
    #          yesterday = yesterday - timedelta(days = 2)

    #          print(yesterday.strftime('%A'),yesterday)
    #          historicParam={
    #                 "exchange": "NSE",
    #                 "symboltoken": "3045",
    #                 "interval": "ONE_DAY",
    #                 "fromdate": f"{str(yesterday)} 09:15", 
    #                 "todate": f"{today_date} {hrs}:{mins}"
    #                 }
    #          z=obj.getCandleData(historicParam)
    #          print("yesterday",z)


    #     # if()







    #     print('leave')
    # else:
    #      historicParam={
    #         "exchange": "NSE",
    #         "symboltoken": "3045",
    #         "interval": "ONE_DAY",
    #         "fromdate": f"{str(day_before_yesterday)} 09:15", 
    #         "todate": f"{today_date} {hrs}:{mins}"
    #         }
    #      z=obj.getCandleData(historicParam)
    #      print("yesterday",z)
    # print(yesterday)
            


    # if(day_before_yesterday and today_date in leave):
    #     print("leave")
    # else:
    #     historicParam={
    #         "exchange": "NSE",
    #         "symboltoken": "3045",
    #         "interval": "ONE_DAY",
    #         "fromdate": f"{str(day_before_yesterday)} 09:15", 
    #         "todate": f"{today_date} {hrs}:{mins}"
    #         }
    #     z=obj.getCandleData(historicParam)
    #     print(z)
            
    
    


    # historicParam = {
    #     'exchange': 'NSE',
    #     'symboltoken': '3045',
    #     'interval': 'ONE_MINUTE',
    #     'fromdate': '2021-03-12 09:00',
    #     'todate': '2021-03-12 09:16'
    # }
    # # obj.getCandleData(historicParam)
    # d = obj.getCandleData(historicParam)
    # print(d)
    if feedToken:
        return {'status': 'Success', 'token': feedToken, 'refreshtoken': refreshToken}
    else:
        return {'status': 'Failed'}
    return(feedToken)


# print(login())




def sample():
    z=[1,2,3,4,5]
    for i in z:
        print(z)
        time.sleep(2)
sample()

# z = str(10.2)
# print(z)
