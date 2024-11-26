# Auth API

## Overview

The **Auth API** is responsible for user authentication in the Perceivo BE application. It allows users to securely log in, receive authentication tokens, and manage their sessions.

## Endpoints

|               Route                | Description                                               |
| :--------------------------------: | :-------------------------------------------------------- |
|    [POST /login](#1-post-login)    | Authenticates the user and returns a JWT token for access |
| [POST /register](#2-post-register) | Registers a new user account and returns a JWT token      |

---

### 1. **POST /login**

- **Description**:  
  This endpoint allows users to log in by providing their email and password. Upon successful login, a JWT token will be returned, which can be used for further authenticated requests to other API endpoints.

- **Request Body**:

  - **Content-Type**: `application/json`
  - **Body Example**:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```

- **Response**:

  - **Content-Type**: `application/json`
  - **Body Example**:
    ```json
    {
      "status": "success",
      "message": "Login successful",
      "data": {
        "token": "JWT_TOKEN_HERE"
      }
    }
    ```

- **Endpoint URL**:  
  `POST https://sentivuebe1-6dh6x3vy.b4a.run/dev/login`

- **Response Codes**:
  - `200 OK`: Login successful, JWT token and user data returned.
  - `401 Unauthorized`: Incorrect credentials (email or password).
  - `400 Bad Request`: Missing or invalid request data.

> [!TIP]
>
> Use the JWT token provided in the response to access protected endpoints. **Without the token**, your API requests will be unauthorized.

---

## 2. **POST /register**

- **Description**:  
  This endpoint allows users to register a new account by providing their email, password, username, full name, and address. Upon successful registration, a confirmation message is returned, and users can log in using the `/login` endpoint.

- **Request Body**:

  - **Content-Type**: `application/json`
  - **Body Example**:
    ```json
    {
      "email": "string",
      "password": "string",
      "username": "string",
      "fullname": "string",
      "address": "string"
    }
    ```

- **Response**:

  - **Content-Type**: `application/json`
  - **Body Example**:
    ```json
    {
      "status": "success",
      "message": "User registered successfully, you can login using /login",
      "version": "tags/v1.0.0"
    }
    ```

- **Endpoint URL**:  
  `POST https://sentivuebe1-6dh6x3vy.b4a.run/dev/register`

- **Response Codes**:
  - `200 OK`: Registration successful. User can now log in.
  - `400 Bad Request`: Missing or invalid request data.
  - `404 Not Found`: Error during registration (e.g., database issue).
  - `409 Conflict`: Email or username already exists.

> [!TIP]
> use the JWT Token provided to get the correct access, **without the token** you cannot use this API service.

## Authentication Flow

1. **Login**:  
   The user provides their credentials (`email` and `password`) to the `/login` endpoint.
2. **Token Issuance**:  
   If the credentials are valid, a JWT token is returned, which the user can use to authenticate subsequent requests.
3. **Logout**:  
   The user can log out by calling the `/logout` endpoint, invalidating their current session.

---

## Security Notes

- Always send login requests over HTTPS to ensure sensitive data (like the password) is encrypted in transit.
- JWT tokens should be stored securely (e.g., in HTTP-only cookies) to avoid security vulnerabilities.

---

## Example Use Case

A user logs into the system using their credentials:

1. A POST request is made to `/login` with the user's email and password.
2. Upon successful login, the server responds with a JWT token.
3. The user stores this token in their application and uses it for authentication in further API calls.

---

## Additional Information

For more information on the Auth API or to request access to the full API documentation, please contact the API team or refer to the full technical documentation.
