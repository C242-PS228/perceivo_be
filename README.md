# Perceivo BE v1.0.0 Beta
backtest backend : https://sentivuebe1-6dh6x3vy.b4a.run/dev

<p>
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
</p>
<p>
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
</p>
<p>
## Profile [token required]
You can view your account information using endpoints ```GET https://sentivuebe1-6dh6x3vy.b4a.run/dev/profile```.

> [!TIP]
> use the JWT Token provided to get the correct access, without the token you cannot use this API service.
</p>
<p>
## create Sentiment
With this API endpoint you can see various collections of scraping comments from social media, comments that are successfully scraped will be processed by our AI system to provide response expressions from various customers and resumes of all comments obtained. Using this endpoint ```POST https://sentivuebe1-6dh6x3vy.b4a.run/dev/sentiment```.

Available sentiment platform
1. instagram
2. instagram reels
3. tiktok
4. youtube
5. googlemaps

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
</p>
