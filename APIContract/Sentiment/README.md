# Sentiment Analysis API

## Overview

The **Sentiment Analysis API** allows you to scrape comments from various social media platforms, analyze the sentiment, and return results. This API processes the comments using an AI system to determine the sentiment and provide summaries for each comment. It supports four main platforms: Instagram, TikTok, YouTube, and Google Maps.

## Endpoints

| Route                                                                  | Description                                                |
| ---------------------------------------------------------------------- | ---------------------------------------------------------- |
| [POST /dev/sentiment](#1-create-sentiment)                             | Create sentiment analysis from social media comments.      |
| [GET /dev/sentiment](#2-show-all-sentiment)                            | Retrieve all sentiment data.                               |
| [POST /dev/sentiment/{unique_id}](#3-show-sentiment-detail)            | Retrieve detailed sentiment data for a specific unique_id. |
| [POST /dev/sentiment/{unique_id}/comments](#4-show-sentiment-comments) | Retrieve comments from a specific sentiment.               |

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
    `json{...}`

- **Response Codes**:
  - `200 OK`: Sentiment analysis created successfully.
  - `400 Bad Request`: Missing or invalid parameters.

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

    ```json { ... }

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

    ```json { ... }

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
  `POST https://sentivuebe1-6dh6x3vy.b4a.run/dev/sentiment/{unique_id}/comments`

- **Response**:

  - **Content-Type**: `application/json`
  - **Body Example**:

    ```json { ... }

    ```

- **Response Codes**:
  - `200 OK`: Comments retrieved successfully.
  - `404 Not Found`: Sentiment with the given unique ID not found.

> [!TIP]  
> Replace `{unique_id}` with the actual unique ID to retrieve the comments related to the sentiment.

---

## Sentiment Flow

1. **Create Sentiment**:  
   Send a `POST` request to `/dev/sentiment` with the social media link(s) and platform name to create sentiment analysis.

2. **Retrieve All Sentiments**:  
   Send a `GET` request to `/dev/sentiment` to view all sentiment data.

3. **Retrieve Sentiment Detail**:  
   Use the `POST` method to retrieve detailed sentiment data using a specific `unique_id`.

4. **Retrieve Comments**:  
   Use the `POST` method to get all comments related to a sentiment using a specific `unique_id`.

---

## Security Notes

- Always send requests over HTTPS to ensure that sensitive data, such as comments and analysis results, are encrypted during transit.
- Handle `unique_id` securely to prevent unauthorized access to specific sentiment data.

---

## Additional Information

For more information on the Sentiment API or to request access to the full API documentation, please contact the API team or refer to the full technical documentation.

---
