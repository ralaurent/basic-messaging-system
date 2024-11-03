# BMS (Basic Messaging System)

BMS is a messaging service that allows you to send emails and SMS text messages to recipients. Each message must specify a type ("SMS" or "EMAIL") and include a valid recipient and content.

## Prerequisites

- Docker
- Node.js (version 18 or higher)
- PostgreSQL

## Getting Started

### Step 1: Install Dependencies
Navigate to the project directory and install the required dependencies:
```bash
npm install
```

### Step 2: Run the Docker PostgreSQL Database
To start the PostgreSQL database, use the following Docker command:

```bash
docker run -d \
  --name postgres \
  -p 5432:5432 \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=communication_service \
  postgres:latest
```

### Step 3: Start the Server
To start the BMS server, run:

```bash
npm start
```

The server will start on port 3000 by default.

### API Structure
The API accepts messages in the following JSON format:

```json
{
  "type": "email",
  "recipient": "recipient@example.com",
  "content": "Hello, World!"
}
```

## Testing

To run the tests, use the following command:

```bash
npm test
```

## Contributing

Contributions are welcome!