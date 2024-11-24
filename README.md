# Perceivo BE v1.0.0 Beta
backtest backend : https://sentivuebe1-6dh6x3vy.b4a.run/dev

## Login
Login gives us access to various endpoints, after doing the login process, you will get a ```JWT bearer token```, with this token you can access the role that has been determined. using this endpoint to login
```POST https://sentivuebe1-6dh6x3vy.b4a.run/dev/login```

> [!TIP]
> use the JWT Token provided to get the correct access, without the token you cannot use this API service.

body request :
```
email: string
password: string
```

## Register
when you don't have an account to get the ```JWT Token``` you need to register a new account using the Register feature, you can access register at the endpoint ```POST https://sentivuebe1-6dh6x3vy.b4a.run/dev/register```.

body request :
```
username: string
email: string
password: alphanumeric
fullname: string
address: string
```

> [!TIP]
> use the JWT Token provided to get the correct access, without the token you cannot use this API service.

## Show User Profile 
You can view your account information using endpoints ```GET https://sentivuebe1-6dh6x3vy.b4a.run/dev/profile```.

## Update User Profile Detail
You can update your profile account information using this endpoint ```PUT https://sentivuebe1-6dh6x3vy.b4a.run/dev/profile```.

body request
```
fullname: string,
username: string,
address: string
```

## Change User Password
If You want to change your password information, you can using this endpoint ```PUT https://sentivuebe1-6dh6x3vy.b4a.run/dev/profile/changepassword```.

body request
```
oldPassword: string,
newPassword: string
```

## Create Sentiment
With this API endpoint you can see various collections of scraping comments from social media, comments that are successfully scraped will be processed by our AI system to provide response expressions from various customers and resumes of all comments obtained. Using this endpoint ```POST https://sentivuebe1-6dh6x3vy.b4a.run/dev/sentiment```.

Available sentiment platform
1. instagram
2. tiktok
3. youtube
4. googlemaps

> [!TIP]
> Use an array to specify multiple links by adding ```link: [link 1, link 2, link 3]```.
> 
body request :
```
link: string | array
platforName: string (sentiment platform above)
```

> [!TIP]
> In the default request the number of comments that will be displayed is 1 comment, you can use the optional request body ```resultLimit: integer (max 500)``` to see more than one comments.

### Example
```
// single link
curl -X POST -H "Content-Type: application/json" -d '{"link": "https://link1", "platformName": "tiktok", "resultLimit": 15}' https://sentivuebe1-6dh6x3vy.b4a.run/dev/sentiment

// multiple link
curl -X POST -H "Content-Type: application/json" -d '{"link": ["https://link1", "https://link2"], "platformName": "tiktok", "resultLimit": 15}' https://sentivuebe1-6dh6x3vy.b4a.run/dev/sentiment 
```

## Show All Sentiment
To get all the sentiment data that was created, use this endpoint ```GET https://sentivuebe1-6dh6x3vy.b4a.run/dev/sentiment```.

## Show Sentiment Detail
To get sentiment details, you need to determine the ```unique_id``` of the sentiment, this id can be found in the response data of all sentiments, use this endpoint
```POST https://sentivuebe1-6dh6x3vy.b4a.run/dev/sentiment/{unique_id}```.

## Show Sentiment Detail Comments
When you want to get only all the comments that were successfully stored in sentiment, you can use this endpoint.
```POST https://sentivuebe1-6dh6x3vy.b4a.run/dev/sentiment/{unique_id}/comments```
