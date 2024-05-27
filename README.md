# Crypto Trades API

This is a Node.js application that allows users to upload cryptocurrency trade data from a CSV file and query the asset-wise balance at any given timestamp. The application uses MongoDB for data storage.

## Features

- Upload a CSV file containing cryptocurrency trades and store the data in a MongoDB database.
- Query the asset-wise balance of the account at any given timestamp.

## Setup Instructions

1. Clone the repository:
    ```bash
    git clone https://github.com/swati1229/cryptoTrade.git
    cd cryptoTrade
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up the environment variables:
    - Create a `.env` file in the root directory.
    - Add the following content to the `.env` file:
      ```plaintext
      MONGO_URL= YOUR_MONGODB_URL
      PORT=5000
      ```

4. Start the Node.js server:
    ```bash
    npm start
    ```

## API Endpoints

### Upload Trade Data

- **URL:** `/trade/importData`
- **Method:** `POST`
- **Description:** Upload a CSV file containing trade data and store it in the database.
- **Request:**
  - Content-Type: `multipart/form-data`
  - Form Data: `file` (the CSV file to be uploaded)
- **Response:**
  ```json
  {
    "status": 200,
    "success": true,
    "message": "CSV imported..."
  }

### Query Asset-Wise Balance

- **URL:** `/trade/balance`
- **Method:** `POST`
- **Description:** Get the asset-wise balance of the account before a given timestamp.
- **Request:**
  - Content-Type: `application/json`
  - json body: 
    {
        "timestamp": "2022-09-28 12:00:00"
    }

- **Response:**
  ```json
  {
    "BTC": 15,
    "MATIC": 100
  }
