# Dashboard API

## **Overview**

The **Dashboard API** provides data for a logged-in user's dashboard, including user information, sentiment data, sentiment counts, and the total comment limit.

---

## **Endpoints**

| Route                                   | Description                         |
| --------------------------------------- | ----------------------------------- |
| [GET /dashboard](#1-get-dashboard-data) | Retrieve the user's dashboard data. |

---

### 1. **Get Dashboard Data**

- **Description**:  
  Retrieves the logged-in user's dashboard data, including user profile information, sentiment statistics, and comment limits.

- **Endpoint URL**:  
  `GET https://perceivo-backend-api-132823030367.asia-southeast2.run.app/1.0.0-latest/dashboard`

- **Response**:

  - **Content-Type**: `application/json`
  - **Body Example**:
    Berikut adalah respons yang telah disesuaikan: semua tipe data berbasis angka menggunakan `int`, sedangkan teks tetap menggunakan `string`:

    ```json
    {
      "version": "1.0.0-latest",
      "status": "success",
      "data": {
        "user": {
          "id": 31,
          "username": "string",
          "email": "string",
          "created_at": "string"
        },
        "sentimentCount": 1,
        "totalCommentsLimit": "int",
        "sentiments": [
          {
            "sentiment_id": 148,
            "sentiment_unique_id": "string",
            "platform": "string",
            "sentiment_link": "string",
            "sentiment_created_at": "string",
            "statistic_id": "int",
            "tags": "string",
            "statistic": {
              "id": "int",
              "data": {
                "questions": [],
                "assistances": [],
                "positive": 1,
                "negative": 0,
                "neutral": 0,
                "topstatus": {
                  "negative": [],
                  "positive": [
                    {
                      "username": "string",
                      "text": "string"
                    }
                  ]
                },
                "key_words": {
                  "positive": [],
                  "negative": [],
                  "graph_negative": [],
                  "graph_positive": [
                    {
                      "tagname": "string",
                      "value": 1
                    }
                  ]
                },
                "resume": "string"
              }
            }
          }
        ],
        "totalSentimentStatistics": {
          "positive": 12,
          "negative": 0,
          "neutral": 8
        }
      }
    }
    ```

- **Response Fields**:

  - `status`: Request status (e.g., `"success"` or `"error"`).
  - `user`: Information about the logged-in user, including:
    - `name`: Full name of the user.
    - `email`: Email address of the user.
  - `sentiments`: Sentiment statistics, broken down into positive, neutral, and negative counts.
  - `sentimentCount`: Aggregate sentiment data, including:
    - `totalSentiments`: Total number of sentiments analyzed.
    - `totalCommentsAnalyzed`: Total number of comments processed.
  - `commentsLimit`: Comment usage and limit data, including:
    - `used`: Number of comments analyzed so far.
    - `limit`: Maximum allowed number of comments to analyze.

- **Response Codes**:
  - `200 OK`: Dashboard data retrieved successfully.
  - `401 Unauthorized`: User not authenticated.
  - `500 Internal Server Error`: An error occurred while processing the request.

---

## **Example Request**

- **cURL Example**:

  ```bash
  curl -X GET https://sentivuebe1-6dh6x3vy.b4a.run/dev/dashboard
  ```

> [!TIP]
>
> Use the JWT token provided in the response to access protected endpoints. **Without the token**, your API requests will be unauthorized.

---

## **Security Notes**

- Ensure all requests are sent over HTTPS to secure sensitive user data.
- Users must be authenticated to access this endpoint. Provide a valid authorization token in the request header if required.

---
