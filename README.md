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

## create Sentiment
available sentiment platform
1. instagram
2. instagram reels
3. tiktok
4. facebook

### Single Sentiment
```
POST https://sentivuebe1-6dh6x3vy.b4a.run/dev/sentiment
```
body request :
```
link: string
platformName: 'instagram'
```
optional :
```
resultLimit: integer
```
example :
```
curl -X POST -H "Content-Type: application/json" -d '{"link": "https://www.tiktok.com/@stacktugas.id/video/7362183020557733125", "platformName": "tiktok", "resultLimit": 15}' https://sentivuebe1-6dh6x3vy.b4a.run/dev/sentiment
```

### Multiple Sentiment
```
POST https://sentivuebe1-6dh6x3vy.b4a.run/dev/sentiment
```

body request :
```
link: [string, string]
platformName: 'instagram'
```
optional :
```
resultLimit: integer
```
example :
```
curl -X POST -H "Content-Type: application/json" -d '{"link": ["https://www.tiktok.com/@stacktugas.id/video/7362183020557733125", "https://www.tiktok.com/@naufalhal/video/7237490714295176449"], "platformName": "tiktok", "resultLimit": 15}' https://sentivuebe1-6dh6x3vy.b4a.run/dev/sentiment
```

> [!TIP]
> Using large amounts of resultLimit will incur additional costs
