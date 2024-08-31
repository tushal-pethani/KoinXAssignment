# KoinXAssignment 🚀

## Table of Contents
- Introduction
- Features
- Installation
- Usage
- API Endpoints
- Cron Jobs
- Contributing
- License

## Introduction 📖
KoinX is a Node.js application designed to fetch and store Ethereum prices at regular intervals using cron jobs. It provides a RESTful API for accessing transaction data and calculating user expenses based on their Ethereum address.

## Features ✨
- 📈 Fetches and stores Ethereum prices every minute.
- 🔄 Fetches and stores transactions of a user by their Ethereum address.
- 💰 Calculates the expenses of the user based on their Ethereum address.
- 🌐 RESTful API for transaction data.
- ⚙️ Middleware for handling asynchronous operations.

## Installation 🛠️
1. Clone the repository:
    ```bash
    git clone https://github.com/<yourusername>/KoinX.git
    ```
2. Navigate to the project directory:
    ```bash
    cd KoinX
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

## Usage 🚀
1. Start the server:
    ```bash
    npm run dev
    ```
2. The server will be running at `http://localhost:8000`.

## API Endpoints 🌐
### Transactions
- **GET /api/v1/transactions/:address**
    - Description: Fetch transactions for a given address and store them in MongoDB.
    - Parameters:
        - `address` (string): The Ethereum address.

### Expenses
- **GET /api/v1/expenses/:address**
    - Description: Calculate the expenses of the user based on their Ethereum address.
    - Parameters:
        - `address` (string): The Ethereum address.

## Cron Jobs ⏰
- **Fetch and Store Ethereum Price**
    - Schedule: Every minute
    - Handler: `fetchAndStorePrice`
    - Logs: "Ethereum price fetched and stored"

## License 📜
This project is licensed under the MIT License.
