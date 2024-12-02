# Perceivo BE v1.0.0 Beta
<<<<<<< HEAD
=======
backtest backend : perceivo_be[https://perceivo-be-cr-832432492088.asia-southeast2.run.app/1.0.0-beta]
>>>>>>> production

Welcome to **Perceivo Backend** (Perceivo BE) version **1.0.0 Beta**. This is the backend API for managing sentiment analysis and user authentication for the Perceivo application.

---

## Backtest Backend

For testing and backtesting, you can access the backend at the following URL:

[Backtest Backend](https://sentivuebe1-6dh6x3vy.b4a.run/dev)

---

## API Structure

The API is organized into the following sections:

### 1. **Authentication (`auth`)**

- **Purpose**: Handles user authentication, including login functionality.
- **Docs**: Navigate to the `auth` folder for detailed API documentation on authentication endpoints.

### 2. **User Profile (`profile`)**

- **Purpose**: Manages user profile-related functionality.
- **Docs**: Navigate to the `profile` folder for documentation on endpoints related to user profiles.

### 3. **Sentiment Analysis (`sentiment`)**

- **Purpose**: Provides sentiment analysis for social media posts and comments. Includes endpoints for fetching, creating, deleting, and filtering sentiment data.
- **Docs**: Navigate to the `sentiment` folder for documentation on sentiment-related endpoints.

### 4. **Tags Management (`tags`)**

- **Purpose**: Handles tag management for categorizing and organizing data. Includes endpoints for creating, retrieving, updating, and deleting tags.
- **Docs**: Navigate to the `tags` folder for detailed API documentation on tag-related endpoints.

---

## API Contract Folders

Here are the API contracts for each section:

- **[Auth API](./APIContract/Auth/README.md)** : Handles user authentication and login.
- **[Profile API](./APIContract/Profile/README.md)** : Manages user profile data.
- **[Sentiment API](./APIContract/Sentiment/README.md)** : Analyzes sentiment from comments or other data.
- **[Tags API](./APIContract/Tags/README.md)** : Manages tags for organizing and categorizing data.

---

## 1. **Base URL Handler**

- **URL**: `/`
- **Method**: `GET`
- **Description**:  
  This is the default endpoint that provides a status message and version information. It serves as a health check to verify if the API is running and ready for use.

- **Response**:

  - **Content-Type**: `application/json`
  - **Body Example**:
    ```json
    {
      "status": "success",
      "message": "Sentivue backend APIs endpoint, please /login or /register first to use the APIs",
      "version": "tags/v1.0.0"
    }
    ```

- **Response Codes**:
  - `200 OK`: API is up and running, and ready to accept requests.

---

## 2. **Missing URL Handler**

- **URL**: `/*other routes*`
- **Method**: `GET`
- **Description**:  
  This handler returns an error response when the requested route is not found. It informs the client that the specified endpoint does not exist in the API.

- **Response**:

  - **Content-Type**: `application/json`
  - **Body Example**:
    ```json
    {
      "status": "error",
      "message": "Route not found",
      "version": "tags/v1.0.0"
    }
    ```

- **Response Codes**:
  - `404 Not Found`: The requested route does not exist or is invalid.
