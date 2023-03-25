from smartapi import SmartConnect,SmartWebSocket
import pyotp
from nsetools import Nse

nse = Nse()
top_gainers = nse.get_top_gainers()
for i in top_gainers:
    print(i)
def getlivefeed(feedToken,personal_data):
        
    # feed_token=092017047
    FEED_TOKEN=feedToken
    CLIENT_CODE=personal_data['angel_code']
    # token="mcx_fo|224395"
    token="nse_cm|2885&nse_cm"    #SAMPLE: nse_cm|2885&nse_cm|1594&nse_cm|11536&nse_cm|3045
    # token="mcx_fo|226745&mcx_fo|220822&mcx_fo|227182&mcx_fo|221599"
    task="mw"   # mw|sfi|dp

    ss = SmartWebSocket(FEED_TOKEN, CLIENT_CODE)

    def on_message(ws, message):
        print("Ticks: {}".format(message))
        
    def on_open(ws):
        print("on open")
        ss.subscribe(task,token)
        
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

    





def login(personal_data):
    
    obj=SmartConnect(api_key=personal_data['Api_key'])
                #optional
                #access_token = "your access token",
                    #refresh_token = "your refresh_token")
    data = obj.generateSession(personal_data['angel_code'],personal_data['pswd'],pyotp.TOTP(personal_data['otpkey']).now())
    refreshToken= data['data']['refreshToken']
    feedToken=obj.getfeedToken()
    print(feedToken)
    historicParam = {
        "exchange": "NSE",
        "symboltoken": "3045",
        "interval": "ONE_MINUTE",
        "fromdate": "2021-03-12 09:00",
        "todate": "2021-03-12 09:16"
    }
    # obj.getCandleData(historicParam)
    d=obj.getCandleData(historicParam)
    print(d)
    return(feedToken)



def main(personal_data):
    # print(personal_data)
    feedToken=login(personal_data)
    data={
        "exchange":"NSE",
        "tradingsymbol":"SBIN-EQ",
        "symboltoken":"3045"
        }
    
    # getlivefeed(feedToken,personal_data)



    





if __name__ == "__main__":
    personal_data={
    'angel_code':'P205239',
    'Api_key':'9HQ5oCyi',
    'pswd':'3773',
    'otpkey':"YSSC6X4LGTKQMBIRE56FCZZI44"}


    main(personal_data)