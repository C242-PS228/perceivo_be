# Tags API

## Overview

The **Tags API** is responsible for managing tags in the Perceivo BE application. It allows users to create, read, update, and delete tags, as well as check the existence of specific tags.

## Endpoints

|                        Route                         | Description                                |
| :--------------------------------------------------: | :----------------------------------------- |
|          [GET /tags](#1-retrieves-all-tags)          | Retrieves all tags for the logged-in user. |
| [GET /tags/:unique_id](#2-retrieves-a-specified-tag) | Retrieves details of a specific tag.       |
|          [POST /tags](#3-creates-a-new-tag)          | Creates a new tag.                         |
|      [PATCH /tags/:unique_id](#4-updates-tags)       | Updates an existing tag.                   |
|      [DELETE /tags/:unique_id](#5-delete-tags)       | Deletes a tag.                             |
|          [POST /tags/check](#6-check-tags)           | Checks the existence of specific tags.     |

---

### 1. **Retrieves All Tags**

- **Description**:  
  Retrieves all tags created by the authenticated user.

- **Response**:

  - **Content-Type**: `application/json`
  - **Body Example**:

    ```json
    {
      "status": "success",
      "data": [
        {
          "id": 1,
          "unique_id": "unique_tag_id",
          "tag_name": "example_tag",
          "created_at": "2024-12-01 10:00:00"
        }
      ]
    }
    ```

- **Endpoint URL**:  
  `GET https://sentivuebe1-6dh6x3vy.b4a.run/dev/tags`

- **Response Codes**:
  - `200 OK`: Tags retrieved successfully.
  - `404 Not Found`: No tags found.

---

### 2. **Retrieves a Specified Tag**

- **Description**:  
  Retrieves a specific tag and its associated data using the tag's unique ID.

- **Response**:

  - **Content-Type**: `application/json`
  - **Body Example**:

    ```json
    {
      "status": "success",
      "data": [
        {
          "tag_id": 1,
          "tag_name": "example_tag",
          "tag_created_at": "2024-12-01 10:00:00",
          "sentiment_id": 10,
          "sentiment_unique_id": "unique_sentiment_id",
          "platform": "Twitter",
          "sentiment_link": "https://example.com/sentiment",
          "sentiment_created_at": "2024-12-01 09:00:00"
        }
      ]
    }
    ```

- **Endpoint URL**:  
  `GET https://sentivuebe1-6dh6x3vy.b4a.run/dev/tags/:unique_id`

- **Response Codes**:
  - `200 OK`: Tag retrieved successfully.
  - `404 Not Found`: Tag not found.

---

### 3. **Creates a New Tag**

- **Description**:  
  Creates a new tag for the authenticated user.

- **Request Body**:

  - **Content-Type**: `application/json`
  - **Body Example**:

    ```json
    {
      "tag_name": "new_tag"
    }
    ```

- **Response**:

  - **Content-Type**: `application/json`
  - **Body Example**:

    ```json
    {
      "status": "success",
      "message": "success add tag new_tag"
    }
    ```

- **Endpoint URL**:  
  `POST https://sentivuebe1-6dh6x3vy.b4a.run/dev/tags`

- **Response Codes**:
  - `200 OK`: Tag created successfully.
  - `404 Not Found`: Failed to create the tag.

---

### 4. **Updates Tags**

- **Description**:  
  Updates the name of an existing tag using its unique ID.

- **Request Body**:

  - **Content-Type**: `application/json`
  - **Body Example**:

    ```json
    {
      "tag_name": "updated_tag"
    }
    ```

- **Response**:

  - **Content-Type**: `application/json`
  - **Body Example**:

    ```json
    {
      "status": "success",
      "message": "success update tag updated_tag"
    }
    ```

- **Endpoint URL**:  
  `PATCH https://sentivuebe1-6dh6x3vy.b4a.run/dev/tags/:unique_id`

- **Response Codes**:
  - `200 OK`: Tag updated successfully.
  - `404 Not Found`: Failed to update the tag.

---

### 5. **Delete Tags**

- **Description**:  
  Deletes a specific tag using its unique ID.

- **Response**:

  - **Content-Type**: `application/json`
  - **Body Example**:

    ```json
    {
      "status": "success",
      "message": "success delete tag"
    }
    ```

- **Endpoint URL**:  
  `DELETE https://sentivuebe1-6dh6x3vy.b4a.run/dev/tags/:unique_id`

- **Response Codes**:
  - `200 OK`: Tag deleted successfully.
  - `404 Not Found`: Failed to delete the tag.

---

### 6. **Check Tags**

- **Description**:  
  Checks if specific tags exist for the authenticated user.

- **Request Body**:

  - **Content-Type**: `application/json`
  - **Body Example**:

    ```json
    {
      "tags": ["tag1", "tag2"]
    }
    ```

- **Response**:

  - **Content-Type**: `application/json`
  - **Body Example**:

    ```json
    {
      "status": "success",
      "data": [
        {
          "id": 1,
          "tag_name": "tag1"
        }
      ]
    }
    ```

- **Endpoint URL**:  
  `POST https://sentivuebe1-6dh6x3vy.b4a.run/dev/tags/check`

- **Response Codes**:
  - `200 OK`: Tags checked successfully.
  - `404 Not Found`: Failed to check the tags.

---

## Additional Information

For any further details, contact the API team or refer to the technical documentation.
