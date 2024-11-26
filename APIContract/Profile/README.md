# Profile API

## Overview

The **Profile API** is responsible for managing user profile information within the Perceivo BE application. It allows users to retrieve, update, and manage their profile details.

## Endpoints

|                       Route                       | Description                                         |
| :-----------------------------------------------: | :-------------------------------------------------- |
|       [GET /profile](#1-show-user-profile)        | Retrieves the user's profile based on the JWT token |
|      [PUT /profile](#2-update-user-profile)       | Updates the user's profile information              |
| [PUT /profile/changepassword](#3-change-password) | Changes the user's password                         |

---

### 1. **Show User Profile**

- **Description**:  
  This endpoint retrieves the user's profile data based on the JWT token provided in the request header. It returns information such as the user's email, username, full name, address, and more.

- **Endpoint URL**:  
  `GET https://sentivuebe1-6dh6x3vy.b4a.run/dev/profile`

- **Request Headers**:

  - `Authorization`: Bearer `JWT_TOKEN_HERE`

- **Response**:

  - **Content-Type**: `application/json`
  - **Body Example**:
    ```json
    {
      "status": "success",
      "data": [
        {
          "unique_id": "user_unique_id",
          "role_id": "user_role",
          "email": "user_email",
          "username": "user_username",
          "name": "user_fullname",
          "google_id": "user_google_id",
          "address": "user_address",
          "created_at": "user_creation_date"
        }
      ],
      "version": "tags/v1.0.0"
    }
    ```

- **Response Codes**:
  - `200 OK`: Profile data retrieved successfully.
  - `401 Unauthorized`: Invalid or missing JWT token.

> [!TIP]
>
> Ensure you include the JWT token in the `Authorization` header for a successful response.

---

### 2. **Update User Profile**

- **Description**:  
  This endpoint updates the user's profile information. You can update fields such as name, username, and address.

- **Endpoint URL**:  
  `PUT https://sentivuebe1-6dh6x3vy.b4a.run/dev/profile`

- **Request Body**:

  - **Content-Type**: `application/json`
  - **Body Example**:
    ```json
    {
      "fullname": "string",
      "username": "string",
      "address": "string"
    }
    ```

- **Response**:

  - **Content-Type**: `application/json`
  - **Body Example**:
    ```json
    {
      "status": "success",
      "message": "User updated successfully",
      "version": "tags/v1.0.0"
    }
    ```

- **Response Codes**:
  - `200 OK`: Profile updated successfully.
  - `400 Bad Request`: Missing or invalid parameters.

> [!TIP]
>
> Only the fields provided in the request will be updated. Fields not included will remain unchanged.

---

### 3. **Change Password**

- **Description**:  
  This endpoint allows the user to change their password by providing their old password and the new password.

- **Endpoint URL**:  
  `PUT https://sentivuebe1-6dh6x3vy.b4a.run/dev/profile/changepassword`

- **Request Body**:

  - **Content-Type**: `application/json`
  - **Body Example**:
    ```json
    {
      "oldPassword": "string",
      "newPassword": "string"
    }
    ```

- **Response**:

  - **Content-Type**: `application/json`
  - **Body Example**:
    ```json
    {
      "status": "success",
      "message": "Password updated successfully",
      "version": "tags/v1.0.0"
    }
    ```

- **Response Codes**:
  - `200 OK`: Password updated successfully.
  - `400 Bad Request`: Invalid or missing password fields.
  - `401 Unauthorized`: Incorrect old password.

> [!TIP]
>
> Ensure that the new password meets the system's security requirements (e.g., minimum length, special characters).

---

## Profile Flow

1. **Retrieve Profile**:  
   The user makes a `GET` request to `/profile` with the JWT token to retrieve their profile data.

2. **Update Profile**:  
   The user can update their profile by making a `PUT` request to `/profile` with the desired fields (name, username, address).

3. **Change Password**:  
   The user can change their password by making a `PUT` request to `/profile/changepassword` with the old and new password.

---

## Security Notes

- Always send requests over HTTPS to ensure that sensitive data, like the password, is encrypted during transit.
- Store the JWT token securely and avoid exposing it in places such as URLs.

---

## Example Use Case

A user wants to update their profile:

1. The user logs in and receives a JWT token.
2. The user makes a `GET` request to `/profile` to retrieve their current profile data.
3. The user decides to update their profile by sending a `PUT` request with new information, such as a new username or address.

---

## Additional Information

For more information on the Profile API or to request access to the full API documentation, please contact the API team or refer to the full technical documentation.
