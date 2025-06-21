# User Authentication Backend with MongoDB

## Project Overview

This project implements a user authentication system using Node.js, Express, and MongoDB. The system supports essential authentication features, including user registration, login, and password hashing. It also demonstrates how to securely store and verify user credentials using JSON Web Tokens (JWT) for maintaining authenticated sessions.

## Key Features

* **User Registration**: Allows users to register with their email, username, and password.
* **Password Hashing**: Passwords are hashed before being stored in the database using bcrypt to ensure security.
* **JWT Authentication**: JSON Web Tokens (JWT) are used to authenticate users and authorize access to protected routes.
* **MongoDB**: MongoDB is used to store user information such as email, username, and hashed password.
* **Error Handling**: Comprehensive error handling to catch common issues such as invalid email format or weak passwords.

## Prerequisites

Before getting started, make sure you have the following installed:

* [Node.js](https://nodejs.org/)
* [MongoDB](https://www.mongodb.com/)
* [npm](https://www.npmjs.com/)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/user-authentication-backend.git
cd user-authentication-backend
```

### 2. Install Dependencies

Run the following command to install the required dependencies:

```bash
npm install
```

### 3. Set Up MongoDB

Make sure you have MongoDB running locally or use a cloud MongoDB service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

In the project root directory, create a `.env` file and add the following environment variables:

```env
MONGO_URI=mongodb://localhost:27017/user-auth-db
JWT_SECRET=your-secret-key
```

Replace `your-secret-key` with a strong secret key for JWT signing.

### 4. Run the Application

Start the server by running:

```bash
npm start
```

The server should now be running on `http://localhost:5000`.

### 5. Test API Endpoints

* **POST /api/auth/register**: Register a new user.
* **POST /api/auth/login**: Log in with email and password to receive a JWT token.
* **GET /api/user/profile**: Access the authenticated user's profile (requires JWT token).

Use Postman or any API testing tool to test these endpoints.

## API Documentation

### 1. Register User

**Endpoint**: `/api/auth/register`
**Method**: `POST`
**Request Body**:

```json
{
  "email": "user@example.com",
  "username": "username123",
  "password": "securepassword"
}
```

**Response**:

* Status 201: User successfully registered.
* Status 400: Invalid input or email already exists.

### 2. Login User

**Endpoint**: `/api/auth/login`
**Method**: `POST`
**Request Body**:

```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response**:

* Status 200: JWT token is returned.
* Status 400: Invalid email or password.

### 3. Get User Profile (Protected Route)

**Endpoint**: `/api/user/profile`
**Method**: `GET`
**Headers**: `Authorization: Bearer <jwt_token>`

**Response**:

* Status 200: Returns user profile data.
* Status 401: Unauthorized (invalid or missing JWT token).

## Project Structure

```
├── config/              # Configuration files
│   ├── db.js            # MongoDB connection
│   └── auth.js          # JWT authentication setup
├── controllers/         # Logic for handling requests
│   ├── authController.js
│   └── userController.js
├── models/              # MongoDB models
│   ├── User.js          # User model (email, username, hashed password)
├── routes/              # API routes
│   ├── authRoutes.js    # Authentication routes
│   └── userRoutes.js    # User profile routes
├── middleware/          # Middleware functions (e.g., JWT verification)
│   └── authMiddleware.js
├── .env                 # Environment variables
├── package.json         # Project metadata and dependencies
└── server.js            # Express server setup
```

