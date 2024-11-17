# Perceivo BE v1.0.0 Beta
backtest backend : https://sentivuebe1-6dh6x3vy.b4a.run/dev

## Login
```POST https://sentivuebe1-6dh6x3vy.b4a.run/dev/login```
body request :
```
email [string]
password [string]
```

## Register
```POST https://sentivuebe1-6dh6x3vy.b4a.run/dev/register```
body request :
```
username [string]
email [string]
password [alphanumeric]
fullname [string]
address [string]
```

## Profile [token required]
```
GET https://sentivuebe1-6dh6x3vy.b4a.run/dev/profile
```
