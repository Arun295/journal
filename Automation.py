
from smartapi import SmartConnect
from smartWebsocketV2 import SmartWebSocketV2
import pyotp
import time
import threading
import datetime
import holidays
import requests
from datetime import timedelta
import pandas as pd
import os
import io
import json
os.system("")



class style():
    BLACK = '\033[30m'
    RED = '\033[31m'
    GREEN = '\033[32m'
    YELLOW = '\033[33m'
    BLUE = '\033[34m'
    MAGENTA = '\033[35m'
    CYAN = '\033[36m'
    WHITE = '\033[37m'
    UNDERLINE = '\033[4m'
    RESET = '\033[0m'



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



def read_data(dataframe=False):
    file_name='stockdata'
    cwd = os.getcwd()
    path=cwd.split('\\server')[0]+'\\src\\Data'

    try:
        df = pd.read_excel(f'{path}\\{file_name}.xlsx', file_name, engine='openpyxl')
        if(dataframe):
            return df

    # print(df.set_index('symbol')['token'].to_dict())
        # df = df.replace({np.nan: None})

        return(df.to_json(orient="records"))
    except Exception as e:
        print(e)
        data = requests.get(
            'https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json').json()

        return data
def get_nifty_stocks():
    file_name='niftydata'
    cwd = os.getcwd()
    path=cwd.split('\\server')[0]+'\\src\\Data'
    df = pd.read_excel(
        f'{path}\\{file_name}.xlsx', engine='openpyxl')
    stks=[]
    for i in df.Symbol:
        stks.append(i)

    return stks




def readJson():
    # yesterday_gainer = data['data']['yesterdaygainers']
    file_name='niftydata'
    cwd = os.getcwd()
    path=cwd.split('\\server')[0]+'\\src\\Data'

    url = 'https://archives.nseindia.com/content/indices/ind_nifty50list.csv'
    z = requests.get(url).content
    df = pd.read_csv(io.StringIO(z.decode('utf-8')))
    df.to_excel(
        f'{path}\\{file_name}.xlsx', engine='openpyxl',)

    with open(f"{path}\\data.json", 'r') as f:
        data = f.read()
        # print(data)
        return data
    
def getma(data):
    # data = get_history(symbol=str(params), start=date(
    #     2023, 3, 1), end=date(2023, 3, 13))
    init = 0
    count = 0
    for i in data:
        init = init+i[4]
        count = count+1

    avg = init/count
    print("MA count",count)
    return avg,count




def get_historical_data(yesterday,obj,data,five_min=False):
    tod = datetime.datetime.now()
    today_date=str(tod).split(' ')[0]
    hrs=str(tod).split(' ')[1].split(':')[0]
    mins=str(tod).split(' ')[1].split(':')[1]
    length=len(data)
    end=True
    count=0
    data=data
    stk_data=[]
    
    print(f"DATE:______{yesterday},{today_date}")

    if(len(data)>0):
         while end:
            #   print(data[count]['symbol'],(yesterday),(today_date))
              count+=1
              if length==count:
                   end=False
              else:
                
                    if five_min:
                        #print(style.CYAN+data[count]['symbol'],(yesterday),(today_date)+style.RESET)
                        # if(int(hrs)>=9 and int(mins)>=20):
                        try:
                                historicParam={
                                "exchange": "NSE",
                                "symboltoken": str(data[count]['token']),
                                "interval": "FIVE_MINUTE",
                                "fromdate": f"{str(today_date)} 09:15", 
                                "todate": f"{str(today_date)} 09:20"
                                }
                                d=obj.getCandleData(historicParam)
                                if(d['data']==None):
                                    yesterday = yesterday - timedelta(days = 1)
                                    while d['data']==None:
                                            historicParam={
                                                    "exchange": "NSE",
                                                     "symboltoken": str(data[count]['token']),
                                                    "interval": "FIVE_MINUTE",
                                                    "fromdate": f"{str(today_date)} 09:15", 
                                                    "todate": f"{str(today_date)} 09:20"
                                                    }
                                            history_data=obj.getCandleData(historicParam)
                                            #print(history_data,yesterday)
                                            time.sleep(2)
                                            if(history_data['data']==None):
                                                    yesterday = yesterday - timedelta(days = 1)
                                                    pass
                                            else:
                                                    d=history_data
                                                        # print(d)
                                data[count]['history_data']=d['data'][0]
                                print(data[count])
                        except Exception as e:
                                print("Historic 5MIN Api failed: ")
                        time.sleep(2)
                        # else:
                        #     data[count]['history_data']=False
                    else:     
                    
                   
                        try:
                            #print(style.CYAN+data[count]['symbol'],(yesterday),(today_date)+style.RESET)
                            yesterday = yesterday - timedelta(days =7)
                            historicParam={
                            "exchange": "NSE",
                            "symboltoken": str(data[count]['token']),
                            "interval": "ONE_DAY",
                            "fromdate": f"{str(yesterday)} 09:15", 
                            "todate": f"{str(today_date)} 15:00"
                            }
                            d=obj.getCandleData(historicParam)
                            ma,cnt=getma(d['data'])
                            stk_data.append({'token':data[count]['token'],"symbol":data[count]['symbol'],"MA":ma,"cnt":cnt})
                            data[count]['history_data']=d['data'][0]
                            print(data[count])

                        except Exception as e:
                            print("Historic Api failed: ")
                        time.sleep(2)
    # print(data)
    if five_min==False:
         return stk_data
    else:
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
         



def check_order_status(obj,orderId):
        order_details = obj.orderBook()
        z=0
        for i in order_details['data']:
            if len(order_details['data'])>0:
                if orderId!=None:
                    if i['orderid'] == str(orderId):
                        # if i['status']=="rejected":
                        z=i
                        break
                        
            else:
                 z= None
        return z
                 
def ltpdata(obj,data,ma,ohl):
            count=0
            end=True
            calls=[]
            length=len(data)
            # print(data)
            while end:
              count+=1
              try:
                if length==count:
                    end=False
                else:
                    if ohl:
                        d=obj.ltpData("NSE",f"{data[count]['symbol']}-EQ",str(data[count]['token']))
                        stk_ma=None
                        for i in ma:
                            if d['symboltoken']==i['token']:
                                stk_ma=i
                                break
                        print(stk_ma)
                        if stk_ma:
                                if d['ltp']<stk_ma["MA"]:
                                    print(style.RED+"---------------Price is less that MA------------"+style.RESET)
                      
                         
                     
                        if(d['data']['open']==d['data']['high']) and d['ltp']<stk_ma["MA"]:
                            print(style.RED+"---------------Price is less that MA------------"+style.RESET)
                            z=d['data']
                            z['strategy']='OPEN-HIGH'
                            z['history_data']=data[count]['history_data']
                            z['signal']="SELL"
                            z['price']=int(z['history_data'][1]-(d['ltp']*0.15)/100)
                            # z['signal']='SELL'
                            calls.append(z)
                        if(d['data']['open']==d['data']['low']) and d['ltp']>stk_ma["MA"]:
                            print(style.GREEN+"---------------Price is less that MA------------"+style.RESET)

                            z=d['data']
                            z['strategy']='OPEN-LOW'

                            z['history_data']=data[count]['history_data']
                            z['signal']="BUY"
                            z['price']=int(z['history_data'][3]+(d['ltp']*0.15)/100)

                            #  z['signal']='BUY'

                            calls.append(z)
                        else:
                            pass
                    else:
                    
                        d=obj.ltpData("NSE",f"{data[count]['symbol']}-EQ",str(data[count]['token']))
                            
                    time.sleep(0.25)
                #print("calls",calls)

              except Exception as e:
                 print(e)


            return calls

def Buy_Sell_call(obj,params,quantity=0):
        # print("###params###",params)
        symbol = params['tradingsymbol']
        token = params['symboltoken']
        exg = params['exchange']
        call_type=params['signal']
        # quantity=0
        if(quantity>0):
             quantity=quantity
        else:
             
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
        quantity=1;
                
        orderparams = {
            "variety": "NORMAL",
            "tradingsymbol": symbol,
            "symboltoken": token,
            "transactiontype": call_type,
            "exchange": exg,
            "ordertype": "LIMIT",
            "producttype": "INTRADAY",
            "duration": "DAY",
            "price": str((params['price'])),
            # "squareoff": str(targetPrice),
            # 'triggerprice': str(triggerPrice),
            "quantity": str(quantity),

        }
        orderId = obj.placeOrder(orderparams)
        time.sleep(1)
        i=check_order_status(obj,orderId)
        if i:
            return {'status': i['status'], 'message': i['text'], 'orderId': i['orderid'],'quantity':quantity,'symbol':symbol,'data':params}
        else:
             print("NO orders present")




# def check_order_status(obj,orderId):
#         order_details = obj.orderBook()
#         z=0
#         for i in order_details['data']:
#             if len(order_details['data'])>0:
#                 if orderId!=None:
#                     if i['orderid'] == str(orderId):
#                         # if i['status']=="rejected":
#                         z=i
#                         break
                        
#             else:
#                  z= None
#         return z
# def modifyOrder(obj,order_data,quantity):
#     data=order_data['data']
#     symbol = data['tradingsymbol']
#     token = data['symboltoken']
#     exg = data['exchange']
#     call_type=data['signal']
#     orderparams = {
#             "variety": "NORMAL",
#             "tradingsymbol": symbol,
#             "symboltoken": token,
#             "exchange": exg,
#             "ordertype": "LIMIT",
#             "producttype": "INTRADAY",
#             "duration": "DAY",
#             "price": str((data['price'])),
#             "orderid":str(order_data['orderId']),
#             "transactiontype": call_type,

#             # "squareoff": str(targetPrice),
#             # 'triggerprice': str(triggerPrice),
#             "quantity": str(quantity),

#         }
#     orderresponse = obj.modifyOrder(orderparams)
#     order_data['orderId']=orderresponse['data']['orderid']
#     return orderresponse
    

     




def write_order_data(data):
   
    file_name='orders_pos'
    cwd = os.getcwd()
    path=cwd.split('\\server')[0]+'\\src\\Data'

    with open(f"{path}\\{file_name}.json", 'w') as f:
        json.dump(data['data'], f)

    return {'status': 'Success'}







def Set_Buy_Sell(obj,params):
    print("###############################################################")
    print(style.BLUE+f"No of Stocks In ExecutionList {len(params)} "+style.RESET)

    rej=[]
    app=[]
    while_count=0
    # CHECK IF ANY POSITIONS WERE OPEN AND IT SHOULD NOT HAVE TO RUN SAME STOCK AGAIN
    if(len(params)!=0):
         
        if(len(params)<=2):
            for i in params:
                    status=Buy_Sell_call(obj,i)
                    print(style.BLACK+"Less no of stocks were there  starting while loop"+style.RESET)
                    if str(status['status'])=="rejected" and "Insufficient Funds" in status['message']:
                        if(status['quantity']>100):
                            count=0
                            quantity=status['quantity']-25
                            while count==0:
                                status=Buy_Sell_call(obj,status['data'],quantity=quantity)
                                if(str(status['status'])=="rejected" and "Insufficient Funds" in status['message'] and int(quantity) >0):
                                    quantity=quantity-25
                                    while_count+=1
                                    if status['quantity']>100 and while_count!=3:
                                        pass
                                    else:
                                        print(style.YELLOW+status['message']+style.RESET )
                                        rej.append(status)
                                        while_count=0
                                        count+=1
                                        break
                                        
                                elif(str(status['status'])=='open'):
                                    print(style.GREEN+"ORDER IS OPEN----+++++++++----"+style.RESET)
                                    print("CHECKING IF ORDER CAN BE EXECUTED IN 2 MIN  iN NOT NEXT STOCK WILL BE PLACED")
                                    time.sleep(100)
                                    z=check_order_status(obj,status['orderId'])
                                    if z['status']=="Executed" or "Completed":
                                        print("ORDER  EXECUTED ")
                                        print(style.YELLOW+z['message']+style.RESET )
                                        app.append(status)
                                        count=count+1
                                        break
                                    else:
                                        print("ORDER NOT EXECUTED ORDERING NEXT STOCK")
                                        obj.cancelOrder(status['orderId'],"NORMAL")
                                        pass
                                else:
                                    print(style.RED+"ORDER IS REJECTED------"+style.RESET)
                                    print(style.YELLOW+status['message']+style.RESET )

                                    break


                                    
                                time.sleep(1.5)
                        else:
                                    count=0
                                    quantity=status['quantity']-15
                                    status=Buy_Sell_call(obj,status['data'],quantity=quantity)
                                    if(str(status['status'])=="rejected" and "Insufficient Funds" in status['message'] and quantity >0):
                                        rej.append(status)
                                        print(style.RED+"ORDER IS REJECTED------"+style.RESET)
                                        print(style.YELLOW+status['message']+style.RESET )

                                        pass         
                                    elif(str(status['status'])=='open'):
                                        print(style.GREEN+"ORDER IS OPEN----+++++++++----"+style.RESET)
                                        print("CHECKING IF ORDER CAN BE EXECUTED IN 2 MIN  iN NOT NEXT STOCK WILL BE PLACED")
                                        time.sleep(100)
                                        z=check_order_status(obj,status['orderId'])
                                        if z['status']=="Executed" or "Completed":
                                            print(style.YELLOW+"ORDER  EXECUTED "+style.RESET )
                                            app.append(status)
                                            count=count+1
                                            break
                                        else:
                                            print("ORDER NOT EXECUTED ORDERING NEXT STOCK")
                                            obj.cancelOrder(status['orderId'],"NORMAL")
                                            pass
                                    else:
                                        print(style.RED+"ORDER IS REJECTED------"+style.RESET)
                                        print(style.YELLOW+status['message']+style.RESET )

                                        break
                    elif(str(status['status'])=="open" ):
                        print(style.RED+"ORDER IS REJECTED OR EXECUTED------"+style.RESET)
                        print(style.YELLOW+status['message']+style.RESET )
                        app.append(status)


                        break
                    else:
                        print(style.RED+"ORDER IS REJECTED-----"+style.RESET)
            
    
    
                    time.sleep(1.5)
                        
        else:
            count=0
            for i in params:
                status=Buy_Sell_call(obj,i)
                if str(status['status'])=="open":
                        print(style.GREEN+"ORDER IS OPEN----+++++++++----"+style.RESET)
                        print("CHECKING IF ORDER CAN BE EXECUTED IN 2 MIN  iN NOT NEXT STOCK WILL BE PLACED")
                        time.sleep(100)
                        z=check_order_status(obj,status['orderId'])
                        if z['status']=="Executed" or "Completed":
                            print(style.YELLOW+"ORDER  EXECUTED "+style.RESET )
                            app.append(status)
                            count=count+1
                            break
                        else:
                            print("ORDER NOT EXECUTED ORDERING NEXT STOCK")
                            obj.cancelOrder(status['orderId'],"NORMAL")
                            pass
                        # print(style.YELLOW+status['message']+style.RESET )
                        # app.append(status)
                        # break
                else:
                    if(str(status['status'])=="rejected"):
                            print(style.RED+"ORDER IS REJECTED------"+style.RESET)
                            print(style.YELLOW+status['message']+style.RESET )

                            rej.append(status)
                            pass
                    else:
                            print(style.GREEN+"ORDER IS COMPLETED++++++++++++++"+style.RESET)
                            print(style.YELLOW+status['message']+style.RESET )

                            app.append(status)
                            break
    else:
         app.append(0)

    return app,rej


     
def exit_call(obj,params):
    print('buy/sell initiated')
    price = params['ltp']
    # data = params['stockdata']
    symbol = params['tradingsymbol']
    token = params['symboltoken']
    exg = params['exchange']
    quantity = params['netqty']
    order_type="BUY"
    if int(params['sellqty'])>0 and int(params['netqty'])!=0:      
            if '-' in quantity:
                quantity=quantity.split('-')[1]
                order_type="SELL"
    print(price,token,symbol,exg,quantity)
    # 
    orderparams = {
        "variety":"NORMAL",
        "tradingsymbol":str(symbol),
        "symboltoken":str(token),
        "transactiontype":str(order_type),
        "exchange":str(exg),
        "ordertype":"MARKET",
        "producttype":"INTRADAY",
        "duration":"DAY",
        "price":'0',
        "squareoff":"0",
        "stoploss":"0",
        "quantity":str(quantity)

    }
    orderId = obj.placeOrder(orderparams)
    print(orderId)

    return orderId
def setohl(ohldata,ma):
    output=[]
    # fivemin_history=get_historical_data("Five_min",obj,ohldata,True)
    if len(ohldata)>0:
        try:
             
            for item in ohldata:

                if(item['strategy']=="OPEN-HIGH"):
                    stk_ma=None
                    for i in ma:
                        if item['token']==i['token']:
                              stk_ma=i
                              break
                    
                    # d=obj.ltpData(i['exchange'],item['tradingsymbol'],str(item['symboltoken']))
                    # item=d['data']
                    #Relace the item of open with 5 min data
                    print(stk_ma)
                    if stk_ma:
                                if item['ltp']<stk_ma["MA"]:
                                    print(style.RED+"---------------Price is less that MA------------"+style.RESET)

                    if(item['ltp']<=item['history_data'][1] and item['ltp']<item['history_data'][4]):
                            price_range=item['history_data'][2]-item['history_data'][4]
                            percentage_range=(item['history_data'][4]*0.30)/100
                            
                            if(percentage_range<=price_range):
                                print(style.RED+"---------------FIRST Red candle was very big------------"+style.RESET)
                                item['signal']="SELL"
                                item['price']=int(item['history_data'][1]-(item['ltp']*0.15)/100)
                                output.append(item)
                                print('True-O=H',price_range,percentage_range,item['tradingsymbol'])

                    elif(item['ltp']>item['history_data'][4]):
                            

                            item['signal']="SELL"
                            item['price']=item['ltp']+int((item['ltp']*0.15)/100)
                            output.append(item)
                            print('True-O=H',item['tradingsymbol'])

                        
                    else:
                        pass
                        print('false-O=H Not in position to take trade',item['tradingsymbol'])
                else:
                    # d=obj.ltpData(item['exchange'],f"{item['symbol']}-EQ",str(item['token']))
                    # item=d['data']
                    stk_ma=None
                    for i in ma:
                        if item['token']==i['token']:
                              stk_ma=i
                              break
                    price_range=item['history_data'][4]-item['history_data'][3]
                    percentage_range=(item['history_data'][4]*0.30)/100
                    if stk_ma:
                                if item['ltp']<stk_ma["MA"]:
                                    print(style.GREEN+"---------------Price is less that MA------------"+style.RESET)

                    if(item['ltp']>=item['history_data'][1] and item['ltp']>item['history_data'][4]):
                        

                        if(price_range>=percentage_range):
                            print(style.GREEN+"---------------FIRST Green candle was very big------------"+style.RESET)
                            item['signal']="BUY"
                            output.append(item)
                            item['price']=int(item['history_data'][3]+(item['ltp']*0.15)/100)
                            print('True-O=L',price_range,percentage_range,item['tradingsymbol'])
                    elif(item['ltp']<item['history_data'][4]):
                            print(style.GREEN+"---------------LTP<<<CLOSE GOOD------------"+style.RESET)
                            
                            item['signal']="BUY"
                            item['price']=int(item['ltp']-(item['ltp']*0.15)/100)
                            output.append(item)
                            print('True-O=L:',item['tradingsymbol'])
                    else:
                        pass
        
                        print('false-O=L Not in position to take trade',item['tradingsymbol'])

        except Exception as e:
             print(e)

    return output

# def set_full_gap(ohldata):
#     fullgapup=[]
#     if len(ohldata)>0:
#         for i in ohldata:
#             if(i['strategy']=="FULL-GAP-DOWN"):
#                 i['signal']="BUY"
#                 fullgapup.append(i)
#                 print('do full gapdown setup')

#             elif(i['strategy']=="FULL-GAP-UP"):
#                 i['signal']="SELL"
#                 fullgapup.append(i)
#                 print('do full gapup setup')
#     return fullgapup
             
          
def get_position_data(obj,approved_data,stoploss):
    z = obj.position()
    # print(z)
    # print(approved_data)
    if(z['data']==None):
         print(style.YELLOW+"order not placed yet"+style.RESET)
         return {'status':"PAUSE",'data':"order not placed yet"}

    else:
         
        for i in z['data']:
            for j in approved_data:
                if i['tradingsymbol']==j['data']['tradingsymbol'] and int(i['netqty'])>0:
                    if(stoploss!=0):
                        if("-" in i['pnl']):
                            print(style.RED+f"loss-{i['pnl']}"+style.RESET)
                            if(int(float(i['pnl'].split("-")[1]))>=680):
                                print(style.RED+f"Exiting due to sto loss {i['pnl']}"+style.RESET )
                                return {'status':"EXIT",'data':i}
                            else:
                                print(style.YELLOW+f"Loss But not reached Stop Loss {i['pnl']}"+style.RESET)
                                return {'status':"PASS",'data':i}

                                 
                        else:
                            if int(float(i['pnl'])) >=int(float(stoploss['data']['pnl'])):
                                print(style.GREEN+f"Profit, But Target Not Reached {i['pnl']}"+style.RESET)
                                
                                return {'status':"PASS",'data':i}
                            elif int(float(i['pnl'])) >=1500 or int(float(i['pnl'])) >=1200:
                                print(style.GREEN+f"Target Reached {i['pnl']}"+style.RESET)
                                return {'status':"EXIT",'data':i}

                            else:
                                print(style.CYAN+f"Kepp an Eye ON Price {i['pnl']}"+style.RESET)
                                return {'status':"PASS",'data':i}
                    else:
                        if("-" in i['pnl']):
                            print(style.RED+f"loss-------{i['pnl']}"+style.RESET)
                            if(int(float(i['pnl'].split("-")[1]))>=680):
                                print(style.RED+f"Exiting due to sto loss {i['pnl']}"+style.RESET )
                                return {'status':"EXIT",'data':i}
                            else:
                                print(style.YELLOW+f"Loss But not reached Stop Loss {i['pnl']}"+style.RESET)
                                return {'status':"PASS",'data':i}

                                 
                        else:
                            if int(float(i['pnl'])) >=1500 or int(float(i['pnl'])) >=1200:
                                print(style.GREEN+f"Target Reached {i['pnl']}"+style.RESET)
                                return {'status':"EXIT",'data':i}
                            else:
                                print(style.CYAN+f"Kepp an Eye ON Price {i['pnl']}"+style.RESET)
                                return {'status':"PASS",'data':i}
                                 

                else:
                     print(style.BLUE+f"EITHER SYMBOL NOT MATCHED OR nO ACTIVE POSITIONS------------------>\n{i}"+style.RESET)    
                     return {'status':"PAUSE",'data':"order not placed yet"}


                  
    # return z
def timmer():

    sleep_time=0
    readJson()
    whole_data=read_data(True)
    nifty_data=[]
    nifty_stks=get_nifty_stocks()
    for i in nifty_stks:
                        for j in whole_data.index:
                            # print(j['symbol'],i['symbol'])
                            if f"{i}-EQ"== whole_data['symbol'][j]:

                                nifty_data.append({'symbol':i,'token':whole_data['token'][j]})
                                # i['token']= whole_data['token'][j]
                                break
    day=datetime.date.today()
    tod = datetime.datetime.now()
    hrs=str(tod).split(' ')[1].split(':')[0]
    mins=str(tod).split(' ')[1].split(':')[1]
    if(int(hrs)!=9) and int(hrs)<9 :
            sleep_time=(9-int(hrs))*60-int(mins)+16
            for i in range(sleep_time):
                    sleep_time-=1
                    print(style.BLUE+f"time left {sleep_time}"+style.RESET)
                    time.sleep(60)
    elif(int(hrs)>9):
            pass
    else:
            if(int(mins)<16):
                    sleep_time=(16-int(mins))
                    for i in range(sleep_time):
                        sleep_time-=1
                        print(style.BLUE+f"time left {sleep_time}"+style.RESET)
                        time.sleep(60)
            else:
                    print("Working")
                    pass
    return whole_data,nifty_data
                    #sleep_time=(((60-int((mins)))+15)*60)
def writeJson(data):
    # print("############################", data['data'])
    # yesterday_gainer = data['data']['yesterdaygainers']
    file_name='ma'
    cwd = os.getcwd()
    path=cwd.split('\\server')[0]+'\\src\\Data'

    with open(f"{path}\\{file_name}.json", 'w') as f:
        json.dump({"MA":data}, f)

    return {'status': 'Success'}

def readma():
    file_name='ma'
    cwd = os.getcwd()
    path=cwd.split('\\server')[0]+'\\src\\Data'
    g = open(f"{path}\\{file_name}.json")

    # with open (f"{path}\\{file_name}.json", 'r') as f:
    #     data = f.read()
    data=json.load(g)
    return data['MA']    

 
     


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
                'angel_code': 'P20523',
                'Api_key': 'VnxtPCe1',
                'pswd': '',
                'otpkey': 'YSSC6X4LGTKQMBIRE56FCZZI44'}
    
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
    op=get_historical_data(yesterday,logncred['obj'],nifty_data,False)
    writeJson(op)
    BUY=None
    approved=0
    rejected=0
    if (day in leave )==False and day.strftime('%A') !="Saturday" and day.strftime('%A') != "Sunday":
            whole_data,nifty_data=timmer()
            logncred=login(personal_data)
            ma=readma()
            #nifty_data=[]
            # for i in nifty_stks:
            #             for j in whole_data.index:
            #                 # print(j['symbol'],i['symbol'])
            #                 if f"{i}-EQ"== whole_data['symbol'][j]:

            #                     nifty_data.append({'symbol':i,'token':whole_data['token'][j]})
            #                     # i['token']= whole_data['token'][j]
            #                     break


            candledata=get_historical_data(yesterday,logncred['obj'],nifty_data,True)
            #print(candledata)
    
            call_data=ltpdata(logncred['obj'],candledata,ma,ohl=True)
            #print(ohldata)
            # full_ohl=set_full_gap(ohldata)
            #call_data=setohl(ohldata,ma)
            #print(call_data)
            #OPEN=HIGH=LOW
            if(int(hrs)==9 and int(mins)<=35):
                #print('entered')
                # call_datalen=len(call_data)
                if(len(call_data)>0 ):
                        time.sleep(1.5)
                        approved,rejected=Set_Buy_Sell(logncred['obj'],call_data)
                        if(len(approved)>0):
                            count=0
                            STOP_LOSS=0
                            while count==0:
                                STOP_LOSS=get_position_data(logncred['obj'],approved,STOP_LOSS)
                                if(STOP_LOSS['status']=="EXIT"):
                                    print(' 1st write exit code',STOP_LOSS)
                                    exit_call(logncred['obj'],STOP_LOSS['data'])
                                    count+=1
                                    break
                                elif(STOP_LOSS['status']=="PAUSE"):
                                     print(STOP_LOSS['data'])
                                     time.sleep(10)

                                else:
                                    pass
                                time.sleep(60)
                        

                else:
                    time.sleep(60)

                    while len(call_data)==0:
                            call_data=ltpdata(logncred['obj'],candledata,ma,ohl=True)
                            #print(ohldata)
                            # call_data=setohl(ohldata,ma)
                            #print(call_data)
                            approved,rejected=Set_Buy_Sell(logncred['obj'],call_data)
                            if(len(approved)>0 and len(call_data)>0):
                                    count=0
                                    STOP_LOSS=0
                                    while count==0:
                                        STOP_LOSS=get_position_data(logncred['obj'],approved,STOP_LOSS)
                                        print(STOP_LOSS)
                                        if(STOP_LOSS['status']=="EXIT"):
                                            print('2 nd write exit code',STOP_LOSS)
                                            exit_call(logncred['obj'],STOP_LOSS['data'])
                                            count+=1
                                            break
                                        elif(STOP_LOSS['status']=="PAUSE"):
                                            print(STOP_LOSS['data'])
                                            time.sleep(10)


                                        else:
                                            pass
                                        time.sleep(60)
                            # elif (int(hrs)==9 and int(mins)==50 )or(int(hrs)!=9)or(int(mins)>50) :
                            #      count+=1
                            #      break
                                 
                            
                            time.sleep(30)
            # print('check approval,rejcted')
            elif((int(hrs)>=10 and int(mins)<40)):
                 
                 print("another strategy")
                 #if any orders were in 
            op=get_historical_data(yesterday,logncred['obj'],nifty_data,False)
            writeJson(op)
     
                 

                                        

                       
                         

                



    
    else:
         print('today holiday')
    
            





    # print(op)
    

main()