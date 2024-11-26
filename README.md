
#  URL Shortener API

This is a backend service for a URL shortener that allows users to shorten URLs, retrieve the original URL, and track usage statistics such as the number of clicks and the last accessed timestamp.

## **Task Overview**

The API allows users to:
- Shorten URLs.
- Redirect to the original URL via a unique short ID.
- View the usage statistics of shortened URLs, including the total number of clicks and the last accessed timestamp.

---

## **Table of Contents**
1. [API Endpoints](#api-endpoints)
2. [Database Schema](#database-schema)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Rate Limiting](#rate-limiting)
6. [Deployment](#deployment)
7. [Environment Configuration](#environment-configuration)
8. [Error Handling](#error-handling)
9. [Evaluation Criteria](#evaluation-criteria)
10. [License](#license)

---

## **API Endpoints**

### `POST /shorten`
- **Description**: Accepts a URL and returns a shortened URL.
- **Request Body**:
    ```json
    {
      "url": "https://example.com"
    }
    ```
- **Response**:
    ```json
    {
    "success": true,
    "message": "URL shortened successfully !",
    "shortenedURL": "igi1gE7b"
    }   
    ```
- **Validation**:
  - Ensures the URL is valid and not already shortened.

### `GET /:shortId`
- **Description**: Redirects the user to the original URL when accessed with the `shortId`.
- **Response**: A  redirect to the original URL.

### `GET /stats/:shortId`
- **Description**: Returns the usage statistics for a specific short URL.
- **Response**:
    ```json
      {
        "success": true,
        "message": "Stats for given shortId found !",
        "stats": {
          "totalNoOfclicks": 2,
          "lastAccessed": "26 November 2024 at 08:26:10 pm"
        }
      }
    ```

---

## **Database Schema**

- **Collection**: `URL`
  - **originalUrl**: String (Required) - The original URL to be shortened.
  - **shortId**: String (Required, Unique) - The generated short identifier for the URL.
  - **clicks**: Number (Required) - The number of times the shortened URL has been accessed.
  - **lastAccessed**: String (Required) - The timestamp of the last access.

---

## **Installation**

1. Clone the repository:
    ```bash
    git clone https://github.com/sarveshgawade/test_HouseOfMarkTech
  
    ```

2. Create a `.env` file for environment variables (e.g., database connection and port configuration):
    ```env
    MONGO_URL=mongodb://localhost:27017/db_name
    PORT=4000
    ```

3. Start the server:
    ```bash
    npm run start
    ```

The API should now be running on `http://localhost:4000`.

---

## **Usage**

- **Shorten a URL**:
    - `POST /shorten` with a JSON body containing the URL to shorten.
    
- **Redirect to Original URL**:
    - `GET /:shortId` will redirect to the original URL associated with the provided `shortId`.

- **View Stats for Short URL**:
    - `GET /stats/:shortId` will provide the total number of clicks and the last accessed timestamp.

---

## **Rate Limiting**

- The API includes rate limiting to prevent abuse, with a limit of 100 requests per minute per IP address.
- If the limit is exceeded, the user will receive the following message:
    ```json
    {
      "message": "Request limit reached. Please try again later"
    }
    ```

---

## **Deployment**

This API is deployed on :
- [Render](https://test-houseofmarktechv1.onrender.com/)

---

## **Environment Configuration**


  - `MONGODB_URL`: MongoDB connection string is been passed to the environment variables during hosting.
  - `PORT`: Port on which the server will run (default is `4028`).



---

## **Error Handling**

- The API gracefully handles errors such as invalid URLs, missing `shortId`, and database connection issues.


---




## **Contact Information**

For any questions or feedback, please reach out to : sarveshgawadesg@gmail.com
