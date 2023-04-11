
from main import gettop_gainers, gettop_loosers, login, writeJson, get_nifty_stocks,readJson, read_data, get_stock_data, sell_order, findohl, buy_order, get_order_details, get_position_data, get_nifty_fifty_stocks_ohl,exit_market_buy_order,exit_market_sell_order
from smartapi import SmartConnect
from smartWebsocketV2 import SmartWebSocketV2
import pyotp
import time
import threading
import datetime
import holidays
from datetime import timedelta




def login(personal_data):
    

    obj = SmartConnect(api_key=personal_data['Api_key'])
    # optional
    #access_token = 'your access token',
    # refresh_token = 'your refresh_token')
    data = obj.generateSession(personal_data['angel_code'], personal_data['pswd'], pyotp.TOTP(
        personal_data['otpkey']).now())
    refreshToken = data['data']['refreshToken']
    Auth_token=data['data']['jwtToken']
    feedToken = obj.getfeedToken()

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
    # obj.ltpData()
    return { 'feedtoken': feedToken, 'refreshtoken': refreshToken,'jwtToken':Auth_token,'obj':obj}
    




def call(personal_data,logncred,candledata):
            
        AUTH_TOKEN = logncred['jwtToken']
        API_KEY = personal_data['Api_key']
        CLIENT_CODE = personal_data['angel_code']
        FEED_TOKEN = logncred['feedtoken']
        

        correlation_id = "nishant_123_qwerty"
        action = 1
        count=len(candledata)
        mode = 2
        length=len(candledata)
        token_list = [{"exchangeType": 1, "tokens": []}]
        for i in candledata:
             token_list[0]['tokens'].append(str(i['token']))


        sws = SmartWebSocketV2(AUTH_TOKEN, API_KEY, CLIENT_CODE, FEED_TOKEN)



        def on_open(wsapp):
            print("on open")
            sws.subscribe(correlation_id, mode, token_list)


        def on_error(wsapp, error):
            print(error)


        def on_close(wsapp):
            print("Close")
        


        
        def on_data(wsapp, message):
            print("Ticks: {}".format(message))
            # output.append(message)
            # print(length)
            # if length==0:
            #         sws.unsubscribe(correlation_id, mode, token_list)
            #         sws.close_connection()
            # else:
            #      for i in candledata:
            #         if str(i['token'])==str(message['token']):
            #             i['tickdata']=message
            #      length=length-1
            #      print(length)

                 
                    #   print('ok')
                    #   print(i['token'],message['token'])

                    # print(i['token'],message['token'])

                    # print('no')
            

            
             
            

            #  output=message['last_traded_price']
            #  if output/100>100:
            #       print(message)
            #       sws.close_connection()
            #  else:
            #            print(message)
             




        # Assign the callbacks.
        sws.on_open = on_open
        sws.on_data = on_data
        sws.on_error = on_error
        sws.on_close = on_close

        sws.connect()

        return candledata
        # threading.Thread(target=sws.connect()).start()
        # print('Control here')
        # time.sleep(10)
        # sws.subscribe(correlation_id, mode, token_list)
        # time.sleep(10)
        # sws.unsubscribe(correlation_id, mode, token_list)
        # sws.close_connection()
        # print('closed')




def get_historical_data(yesterday,obj,data,five_min=False):
    tod = datetime.datetime.now()
    today_date=str(tod).split(' ')[0]
    hrs=str(tod).split(' ')[1].split(':')[0]
    mins=str(tod).split(' ')[1].split(':')[1]
    length=len(data)
    end=True
    count=0
    data=data
    

    if(len(data)>0):
         while end:
              print(data[count]['symbol'],(yesterday),(today_date))
              count+=1
              if length==count:
                   end=False
              else:
                
                    if five_min:
                        try:
                            historicParam={
                            "exchange": "NSE",
                            "symboltoken": str(data[count]['token']),
                            "interval": "FIVE_MINUTE",
                            "fromdate": f"{str(yesterday)} 15:00", 
                            "todate": f"{str(today_date)} {hrs}:{mins}"
                            }
                            d=obj.getCandleData(historicParam)
                            # print(d)
                            data[count]['history_data']=d['data']
                        except Exception as e:
                            print("Historic Api failed: ")
                        time.sleep(2)
                         
                    
                   
                    try:
                        historicParam={
                        "exchange": "NSE",
                        "symboltoken": str(data[count]['token']),
                        "interval": "ONE_DAY",
                        "fromdate": f"{str(yesterday)} 09:15", 
                        "todate": f"{str(today_date)} 15:00"
                        }
                        d=obj.getCandleData(historicParam)
                        # print(d)
                        data[count]['history_data']=d['data']
                    except Exception as e:
                        print("Historic Api failed: ")
                    time.sleep(2)
    return data


def fix_yesterday_date(day):
    # day=datetime.date.today()
    yesterday=day-timedelta(days=1)
    leave = holidays.India()
     
    if(yesterday.strftime('%A') == 'Saturday' or yesterday.strftime('%A') == 'Sunday'):
        if yesterday.strftime('%A') == 'Saturday':
                yesterday = yesterday - timedelta(days = 1)
        if yesterday.strftime('%A') == 'Sunday':
                yesterday = yesterday - timedelta(days = 2)
        if(yesterday in leave):
                 print(yesterday,'is leave shifting day before')
                 yesterday = yesterday - timedelta(days = 1)
    elif(yesterday in leave):
            yesterday = yesterday - timedelta(days = 1)
            if yesterday.strftime('%A') == 'Saturday':
                yesterday = yesterday - timedelta(days = 1)
            if yesterday.strftime('%A') == 'Sunday':
                yesterday = yesterday - timedelta(days = 2)
         
         
    print("Yesterday",yesterday,yesterday.strftime('%A'))
    return yesterday
         

                 
def ltpdata(obj,data,ohl):
            count=0
            end=True
            calls=[]
            length=len(data)
            while end:
              count+=1
              if length==count:
                   end=False
              else:
                if ohl:
                         
                    # z={
                    # "exchange":"NSE",
                    # "tradingsymbol":"-EQ",
                    # "symboltoken":"3045",
                    # }
                    percent = 0.75;

                    d=obj.ltpData("NSE",f"{data[count]['symbol']}-EQ",str(data[count]['token']))
                    # if()

                    print('open-',d['data']['open'],'high-',data[count]['history_data'][0][2],'low-',data[count]['history_data'][0][3])
                    
                    if int(d['data']['open'])>int(data[count]['history_data'][0][2]):
                       #why total percent is using
                   
                            print('FULL-GAP-UP',d['data']['open'],data[count]['history_data'][0][2])
                            z=d['data']
                            z['strategy']='FULL-GAP-UP'
                            # z['signal']='BUY'
                            calls.append(d['data'])
                          

                    elif int(d['data']['open'])<int(data[count]['history_data'][0][3]):
                                               #why total percent is using


                                print('FULL-GAP-DOWN',d['data']['open'],data[count]['history_data'][0][2])
                                z=d['data']
                                z['strategy']='FULL-GAP-DOWN'
                                # z['signal']='SELL'
                                calls.append(d['data'])
                        

                                #           })
                    elif(d['data']['open']==d['data']['high']):
                        z=d['data']
                        z['strategy']='OPEN-HIGH'
                        # z['signal']='SELL'
                        calls.append(d['data'])
                

                        #                   })
                    elif(d['data']['open']==d['data']['low']):
                         z=d['data']
                         z['strategy']='OPEN-LOW'
                        #  z['signal']='BUY'

                         calls.append(d['data'])
                    else:
                         pass
                else:
                   
                    d=obj.ltpData("NSE",f"{data[count]['symbol']}-EQ",str(data[count]['token']))
                         


                    time.sleep(1)
            return calls

def Buy_Sell_call(obj,params):
        print("###params###",params)
        symbol = params['tradingsymbol']
        token = params['symboltoken']
        exg = params['exchange']
        # targetPrice = params['targetPrice']
        # price = params['price']
        call_type=params['signal']
        quantity=0
        # stopLoss = params['stopLoss']
        if (params['ltp'] > 500 and params['ltp'] < 1000) :
            quantity = 375;
        elif (params['ltp'] > 1000 and params['ltp'] < 1500) :
            quantity = 257;
        elif (params['ltp'] < 500) :
            quantity = 452;
        elif (params['ltp'] > 1500 and params['ltp'] < 2200) :
            quantity = 125;
        else :
            quantity = 75;
            

        orderparams = {
            "variety": "NORMAL",
            "tradingsymbol": symbol,
            "symboltoken": token,
            "transactiontype": call_type,
            "exchange": exg,
            "ordertype": "LIMIT",
            "producttype": "INTRADAY",
            "duration": "DAY",
            "price": str((params['ltp'])),
            # "squareoff": str(targetPrice),
            # 'triggerprice': str(triggerPrice),
            "quantity": str(quantity),

        }
        orderId = obj.placeOrder(orderparams)

        order_details = obj.orderBook()
        for i in order_details['data']:
            if i['orderid'] == str(orderId):
                # if i['status']=="rejected":

                    return {'status': i['status'], 'message': i['text'], 'orderId': i['orderid'],'symbol':symbol,'data':params}



     















     
def Set_Buy_Sell(obj,params):
    print('buy/sell initiated')
    rejected=[]
    approved=[]
    output=''
    # if(len(params))>1:
    for i in params:
            status=Buy_Sell_call(obj,i)
            if status['status']=="rejected":
                rejected.append(status)
                time.sleep(1)
                pass
            elif status['status']=="open":
                approved.append(status)
                break
    # if(len(approved)>0):
    #     return approved
    return approved,rejected


            #     count=count+1
            # elif(i['tradingsymbol'] in rejected):
            #     count=count+1
            #     Buy_Sell_call(obj,params[count])


                

                # print("")
    # else:
    #     status=Buy_Sell_call(obj,i)
    #     if status['status']=="rejected":
    #         rejected.append(status['symbol'])
                     
    #         pass
    #     elif status['status']=="open":
    #         break
         
         
        
    # return orderId

# def get_order_data(obj,order_id):
     
#         order_details = obj.orderBook()
#         for i in order_details['data']:
#             if i['orderid'] == str(order_id):
#                 return {'status': i['status'], 'message': i['text'], 'orderId': i['orderid']}

     


     
def exit_call():
    print('buy/sell initiated')
def setohl(ohldata):
    output=[]
    if len(ohldata)>0:
        # for i in ohldata:
        #     if(i['strategy']=="FULL-GAP-DOWN"):
        #         print('do full gapdown setup')

        #     elif(i['strategy']=="FULL-GAP-UP"):
        #         print('do full gapup setup')
        for i in ohldata:

            if(i['strategy']=="OPEN-HIGH"):
                z=i['open']-i['ltp']
                high_percentage_range=i['open']*(0.2/100)
                low_percentage_range=i['open']*(0.1/100)
                if(z>low_percentage_range and z<high_percentage_range):
                    print('sell signal')
                    i['signal']="SELL"
                    output.append(i)

                    print('True',high_percentage_range,z,low_percentage_range,i['tradingsymbol'])
                else:
                    print('false',high_percentage_range,z,low_percentage_range)

                            
            
            elif(i['strategy']=="'OPEN-LOW"):
                z=i['open']-i['ltp']
                if z>0:
                    high_percentage_range=i['open']*(0.2/100)
                    low_percentage_range=i['open']*(0.1/100)
                    if(z>low_percentage_range and z<high_percentage_range):
                        print('BUY signal')
                        i['signal']="BUY"
                        output.append(i)
                        print('True',high_percentage_range,z,low_percentage_range,i['tradingsymbol'])
                    else:
                         pass
                        # print('false',high_percentage_range,z,low_percentage_range)
    return output

                     

def set_full_gap(ohldata):
    fullgapup=[]
    if len(ohldata)>0:
        for i in ohldata:
            if(i['strategy']=="FULL-GAP-DOWN"):
                i['signal']="BUY"
                fullgapup.append(i)
                print('do full gapdown setup')

            elif(i['strategy']=="FULL-GAP-UP"):
                i['signal']="SELL"
                fullgapup.append(i)
                print('do full gapup setup')
    return fullgapup
             
          

     


def main():
    #Run the ode fopr every three minutes until buy or sell signal
    #check the time if it is railway or not -> railway time
    #write buy sell
    #write exit calls
    #write after buy call i initiated
    #in the end write testing of the code for accuracy not with real money

    day=datetime.date.today()
    tod = datetime.datetime.now()
    leave = holidays.India()
    hrs=str(tod).split(' ')[1].split(':')[0]
    mins=str(tod).split(' ')[1].split(':')[1]
    personal_data = {
                'angel_code': 'P205239',
                'Api_key': 'heInmbVF',
                'pswd': '3773',
                'otpkey': 'YSSC6X4LGTKQMBIRE56FCZZI44'}
    buy=False
    # logncred=login(personal_data)
    # readJson()
    # whole_data=read_data(True)
    # nifty_stks=get_nifty_stocks()
    # nifty_data=[]
    # yesterday=fix_yesterday_date(day)
    # for i in nifty_stks:
    #             for j in whole_data.index:
    #                 # print(j['symbol'],i['symbol'])
    #                 if f"{i}-EQ"== whole_data['symbol'][j]:

    #                     nifty_data.append({'symbol':i,'token':whole_data['token'][j]})
    #                     # i['token']= whole_data['token'][j]
    #                     break
    # candledata=get_historical_data(logncred['obj'],nifty_data)
    # ltp=ltpdata(logncred['obj'],candledata)

    # print(candledata)
    # print(call(personal_data,logncred,candledata))
    

    

         
              
    

    if (day in leave )==False:
            logncred=login(personal_data)
            readJson()
            whole_data=read_data(True)
            nifty_stks=get_nifty_stocks()
            nifty_data=[]
            yesterday=fix_yesterday_date(day)
            for i in nifty_stks:
                        for j in whole_data.index:
                            # print(j['symbol'],i['symbol'])
                            if f"{i}-EQ"== whole_data['symbol'][j]:

                                nifty_data.append({'symbol':i,'token':whole_data['token'][j]})
                                # i['token']= whole_data['token'][j]
                                break
            candledata=get_historical_data(yesterday,logncred['obj'],nifty_data,False)
    
            ohldata=ltpdata(logncred['obj'],candledata,ohl=True)
            print(ohldata)
            full_ohl=set_full_gap(ohldata)
            call_data=setohl(ohldata)
            # call_data=call_data+full_ohl
            print(full_ohl,call_data)
            approved,rejected=Set_Buy_Sell(logncred['obj'],call_data)
            print(approved,"#########################",rejected)



         
    else:
         print('today holiday')
            





    # print(op)
    

main()