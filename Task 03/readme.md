# Account Management API

The Account Management API is a RESTful API built with Node.js, Express.js, and TypeScript. It provides endpoints to create, update, delete, and retrieve account information.

## Features

- Create a new account
- Update an existing account
- Delete an account
- Retrieve account information

## Getting Started

1. Install dependencies: `npm install`
2. Start the server: `npm dev`
3. Use an API client like cURL or Postman to make requests to the endpoints.

## API Endpoints

### Create a New Account

```
POST /accounts
```

Sample Request:

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "name": "John Doe",
  "address": "123 Main Street",
  "phone": "555-1234",
  "email": "john.doe@example.com"
}' http://localhost:3000/accounts
```

### Update an Account

```
PUT /accounts/:id
```

Sample Request:

```bash
curl -X PUT -H "Content-Type: application/json" -d '{
  "name": "Jane Doe",
  "address": "456 Elm Street",
  "phone": "555-5678",
  "email": "jane.doe@example.com"
}' http://localhost:3000/accounts/1
```

### Delete an Account

```
DELETE /accounts/:id
```

Sample Request:

```bash
curl -X DELETE http://localhost:3000/accounts/1
```

### Retrieve Account Information

```
GET /accounts/:id
```

Sample Request:

```bash
curl http://localhost:3000/accounts/1
```
