# Sentiment Analysis API

## Overview

The **Sentiment Analysis API** allows you to scrape comments from various social media platforms, analyze the sentiment, and return results. This API processes the comments using an AI system to determine the sentiment and provide summaries for each comment. It supports four main platforms: Instagram, TikTok, YouTube, and Google Maps.

## Endpoints

| Route                                                                   | Description                                                |
| ----------------------------------------------------------------------- | ---------------------------------------------------------- |
| [POST /dev/sentiment](#1-create-sentiment)                              | Create sentiment analysis from social media comments.      |
| [GET /dev/sentiment](#2-show-all-sentiment)                             | Retrieve all sentiment data.                               |
| [GET /dev/sentiment/{unique_id}](#3-show-sentiment-detail)              | Retrieve detailed sentiment data for a specific unique_id. |
| [GET /dev/sentiment/{unique_id}/comments](#4-show-sentiment-comments)   | Retrieve comments from a specific sentiment.               |
| [DELETE /dev/sentiment/{unique_id}](#5-delete-sentiment)                | Delete a specific sentiment.                               |
| [GET /dev/sentiment/{unique_id}/statistic](#6-show-sentiment-statistic) | Show Sentiment Statistic.                                  |

---

### 1. **Create Sentiment**

- **Description**:  
  This endpoint allows you to scrape comments from social media platforms such as Instagram, TikTok, YouTube, or Google Maps. The comments will be processed by the AI system to determine sentiment and generate summaries.

- **Endpoint URL**:  
  `POST https://sentivuebe1-6dh6x3vy.b4a.run/dev/sentiment`

- **Available Sentiment Platforms**:

  - Instagram
  - TikTok
  - YouTube
  - Google Maps

- **Request Body**:

  - **Content-Type**: `application/json`
  - **Body Example**:

    ```json
    {
      "link": "https://link1",
      "platformName": "tiktok",
      "resultLimit": 15
    }
    ```

> [!TIP]
>
> > Use an array to specify multiple links by adding `"link": ["link1", "link2", "link3"]`.

> [!TIP]
>
> > By default, the number of comments displayed is 1. To see more comments, you can use the optional `resultLimit` parameter (max 500).

- **Response**:

  - **Content-Type**: `application/json`
  - **Body Example**:

    ```json
    {
      "status": "success",
      "message": "Successfully added sentiment analysis",
      "title": "Product Review",
      "tags": ["product", "review"],
      "sentimentId": "unique-id-12345",
      "commentsId": "doc-id-98765",
      "statistic_id": "stat-id-54321",
      "links": "https://link1",
      "platform": "tiktok"
    }
    ```

- **Response Codes**:
  - `200 OK`: Sentiment analysis created successfully.
  - `400 Bad Request`: Missing or invalid parameters.
  - `404 Not Found`: Comments not found.
  - `500 Internal Server Error` : Error processing the request.

### Example Requests

- **Single Link**:

  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"link": "https://link1", "platformName": "tiktok", "resultLimit": 15}' https://sentivuebe1-6dh6x3vy.b4a.run/dev/sentiment
  ```

- **Multiple Links**:
  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"link": ["https://link1", "https://link2"], "platformName": "tiktok", "resultLimit": 15}' https://sentivuebe1-6dh6x3vy.b4a.run/dev/sentiment
  ```

---

### 2. **Show All Sentiment**

- **Description**:  
  This endpoint retrieves all sentiment data that has been created by the system. It provides a list of all sentiments and their associated metadata.

- **Endpoint URL**:  
  `GET https://sentivuebe1-6dh6x3vy.b4a.run/dev/sentiment`

- **Response**:

  - **Content-Type**: `application/json`
  - **Body Example**:
    ```json
    {
      "status": "success",
      "sentiments": [
        {
          "unique_id": "abc123",
          "platform": "tiktok",
          "commentsProcessed": 15,
          "createdAt": "2024-12-01T10:00:00Z"
        },
        {
          "unique_id": "xyz789",
          "platform": "instagram",
          "commentsProcessed": 50,
          "createdAt": "2024-12-02T14:30:00Z"
        }
      ]
    }
    ```

- **Response Codes**:
  - `200 OK`: Sentiment data retrieved successfully.
  - `500 Internal Server Error`: Error retrieving sentiment data.

---

### 3. **Show Sentiment Detail**

- **Description**:
  This endpoint retrieves detailed sentiment analysis for a specific unique ID. The `unique_id` can be found in the response data from the **Show All Sentiment** endpoint.

- **Endpoint URL**:
  `POST https://sentivuebe1-6dh6x3vy.b4a.run/dev/sentiment/{unique_id}`

- **Response**:

  - **Content-Type**: `application/json`
  - **Body Example**:

    ```json
    {
      "status": "success",
      "unique_id": "abc123",
      "platform": "tiktok",
      "sentimentSummary": {
        "positive": 50,
        "neutral": 30,
        "negative": 20
      },
      "comments": [
        {
          "text": "Great product!",
          "sentiment": "positive"
        },
        {
          "text": "Not worth the price.",
          "sentiment": "negative"
        }
      ]
    }
    ```

- **Response Codes**:
  - `200 OK`: Sentiment details retrieved successfully.
  - `404 Not Found`: Sentiment with the given unique ID not found.

> [!TIP]
> Replace `{unique_id}` with the actual unique ID of the sentiment to retrieve detailed data.

---

### 4. **Show Sentiment Comments**

- **Description**:
  This endpoint retrieves all the comments associated with a specific sentiment based on the `unique_id`.

- **Endpoint URL**:
  `GET https://sentivuebe1-6dh6x3vy.b4a.run/dev/sentiment/{unique_id}/comments`

- **Response**:

  - **Content-Type**: `application/json`
  - **Body Example**:

    ```json
    {
      "status": "success",
      "unique_id": "abc123",
      "comments": [
        {
          "text": "Excellent service!",
          "sentiment": "positive"
        },
        {
          "text": "Too expensive for what it offers.",
          "sentiment": "negative"
        }
      ]
    }
    ```

- **Response Codes**:
  - `200 OK`: Comments retrieved successfully.
  - `404 Not Found`: Sentiment with the given unique ID not found.

> [!TIP]
> Replace `{unique_id}` with the actual unique ID to retrieve the comments related to the sentiment.

---

### 5. **Delete Sentiment**

- **Description**:
  This endpoint allows you to delete sentiment analysis data by providing the `unique_id` associated with the sentiment. Once deleted, the data will no longer be accessible.

- **Endpoint URL**:
  `DELETE https://sentivuebe1-6dh6x3vy.b4a.run/dev/sentiment/{unique_id}`

- **Response**:
  - **Content-Type**: `application/json`
  - **Body Example**:
    ```json
    {
      "status": "success",
      "message": "Sentiment data with unique_id {unique_id} deleted successfully."
    }
    ```
- **Response Codes**:
  - `200 OK`: Comments retrieved successfully.
  - `404 Not Found`: Sentiment with the given unique ID not found.
  - `500 Internal Server Error` : There was an error on the server while processing the request.

---

### 6. **Show Sentiment Statistic**

- **Description**:
  This endpoint retrieves the statistical analysis for a given sentiment based on the provided `unique_id`. It fetches detailed statistics, such as the positive, neutral, and negative sentiment counts.

- **Endpoint URL**:
  `GET https://sentivuebe1-6dh6x3vy.b4a.run/dev/sentiment/{unique_id}/statistic`

- **Request Parameters**:

  `unique_id` : The ID that uniquely identifies the sentiment data to retrieve the statistics for.

- **Response**:

  - **Content-Type**: `application/json`
  - **Body Example**:

    ```json
    {
      "status": "success",
      "data": {
        "positive": 100,
        "neutral": 50,
        "negative": 20
      }
    }
    ```

- **Response Codes**:
  - `200 OK`: Comments retrieved successfully.
  - `404 Not Found`: Sentiment with the given unique ID not found.
  - `400 Bad Request` : Invalid request or error while retrieving data.

---

## Sentiment Flow

1. **Create Sentiment**:
   Send a `POST` request to `/dev/sentiment` with the social media link(s) and platform name to create sentiment analysis.

2. **Retrieve All Sentiments**:
   Send a `GET` request to `/dev/sentiment` to view all sentiment data.

3. **Retrieve Sentiment Detail**:
   Use the `GET` method to retrieve detailed sentiment data using a specific `unique_id`.

4. **Retrieve Comments**:
   Use the `GET` method to get all comments related to a sentiment using a specific `unique_id`.

---

## Security Notes

- Always send requests over HTTPS to ensure that sensitive data, such as comments and analysis results, are encrypted during transit.
- Handle `unique_id` securely to prevent unauthorized access to specific sentiment data.

---

## Additional Information

For more information on the Sentiment API or to request access to the full API documentation, please contact the API team or refer to the full technical documentation.

---
