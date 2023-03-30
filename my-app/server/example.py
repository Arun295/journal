# from smartapi import SmartConnect, SmartWebSocket
# import pyotp
import time
# starttime = time.time()

from nsetools import Nse
# from nsepython import *   



# print(nse_eq("JUSTDIAL"))

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
            if int(stk_data['previousClose']) == int(stk_data['open']):
                 op.append({'symbol': i, 'pos': 'open-high',
                      'open': stk_data['open'], 'high': stk_data['dayHigh'], 'ltp': stk_data['lastPrice'], 'low': stk_data['dayLow'] ,'pos2':'gap-up'})
            else:
                op.append({'symbol': i, 'pos': 'open-high',
                      'open': stk_data['open'], 'high': stk_data['dayHigh'], 'ltp': stk_data['lastPrice'], 'low': stk_data['dayLow']})
        elif int(stk_data['dayLow']) == int(stk_data['open']):
                if int(stk_data['previousClose']) == int(stk_data['open']):
                    op.append({'symbol': i, 'pos': 'open-low','open': stk_data['open'], 'low': stk_data['dayLow'], 'ltp': stk_data['lastPrice'], 'high': stk_data['dayHigh'],'pos2':"gap-down"})
                else:
                     op.append({'symbol': i, 'pos': 'open-low',
                      'open': stk_data['open'], 'low': stk_data['dayLow'], 'ltp': stk_data['lastPrice'], 'high': stk_data['dayHigh']})

    return op
#     # print(stk_data)
#     # time.sleep(60.0 - ((time.time() - starttime) % 60.0))
# # personal_data = {
# #     'angel_code': 'P205239',
# #     'Api_key': 'NZkxURxG',
# #     'pswd': '3773',
# #     'otpkey': 'YSSC6X4LGTKQMBIRE56FCZZI44'}

# obj = SmartConnect(api_key=personal_data['Api_key'])
# # optional
# #access_token = 'your access token',
# # refresh_token = 'your refresh_token')
# data = obj.generateSession(personal_data['angel_code'], personal_data['pswd'], pyotp.TOTP(
#     personal_data['otpkey']).now())
# refreshToken = data['data']['refreshToken']
# feedToken = obj.getfeedToken()
# # print((data))
# obj.    

