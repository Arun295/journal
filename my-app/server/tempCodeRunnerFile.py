

# personal_data = {
#     'angel_code': 'P205239',
#     'Api_key': '9HQ5oCyi',
#     'pswd': '3773',
#     'otpkey': "YSSC6X4LGTKQMBIRE56FCZZI44"}

# obj = SmartConnect(api_key=personal_data['Api_key'])
# # optional
# #access_token = "your access token",
# # refresh_token = "your refresh_token")
# data = obj.generateSession(personal_data['angel_code'], personal_data['pswd'], pyotp.TOTP(
#     personal_data['otpkey']).now())
# refreshToken = data['data']['refreshToken']
# feedToken = obj.getfeedToken()
# # z = obj.getProfile(refreshToken)


# z = {
#     "exchange": "NSE",
#     "symboltoken": "3045",
#     "interval": "FIVE_MINUTE",
#     "fromdate": "2023-03-16 09:15",
#     "todate": "2023-03-16 09:25"

# }


# z = obj.getCandleData(z)
# print(z)
