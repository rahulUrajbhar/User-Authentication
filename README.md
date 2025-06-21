# User Authentication Backend with MongoDB & Email Verification

## Project Overview

This project implements a user authentication system using Node.js, Express, and MongoDB, with additional features like email verification, logout functionality, forgot password, and password reset. The system includes secure password storage, JWT-based authentication, and email-based verification for new users.

## Key Features

* **User Registration**: Allows users to register with email, username, and password.
* **Email Verification**: Sends a verification email to the user after registration to activate the account.
* **Password Hashing**: Passwords are hashed before being stored in the database using bcrypt.
* **JWT Authentication**: JSON Web Tokens (JWT) are used for user login and maintaining authenticated sessions.
* **Logout**: Provides an endpoint to logout by invalidating the JWT token.
* **Forgot Password**: Allows users to request a password reset email.
* **Password Reset**: Enables users to reset their password using a secure token.
* **MongoDB**: MongoDB stores user information like email, username, and hashed password.

## Prerequisites

Before getting started, make sure you have the following installed:

* [Node.js](https://nodejs.org/)
* [MongoDB](https://www.mongodb.com/)
* [npm](https://www.npmjs.com/)
* [Nodemailer](https://nodemailer.com/) (used for sending email notifications)

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

Ensure MongoDB is running locally or use a cloud MongoDB service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

In the project root directory, create a `.env` file and add the following environment variables:

```env
MONGO_URI=mongodb://localhost:27017/user-auth-db
JWT_SECRET=your-secret-key
JWT_EXPIRATION=1h
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
```

Replace `your-secret-key` with a strong secret key for JWT signing, and provide your email credentials for sending verification and reset emails.

### 4. Run the Application

Start the server by running:

```bash
npm start
```

The server will be running on `http://localhost:5000`.

### 5. Test API Endpoints

* **POST /api/auth/register**: Register a new user.
* **POST /api/auth/login**: Log in with email and password to receive a JWT token.
* **GET /api/auth/logout**: Log out and invalidate the JWT token.
* **POST /api/auth/forgot-password**: Request a password reset email.
* **POST /api/auth/reset-password**: Reset password using a secure token.
* **GET /api/user/profile**: Access the authenticated user's profile (requires JWT token).

You can test these endpoints using Postman or any API testing tool.

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

* Status 201: User successfully registered, and a verification email is sent.
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

### 3. Logout User

**Endpoint**: `/api/auth/logout`
**Method**: `GET`
**Headers**: `Authorization: Bearer <jwt_token>`

**Response**:

* Status 200: JWT token is invalidated, and the user is logged out.
* Status 401: Unauthorized (invalid or missing JWT token).

### 4. Forgot Password

**Endpoint**: `/api/auth/forgot-password`
**Method**: `POST`
**Request Body**:

```json
{
  "email": "user@example.com"
}
```

**Response**:

* Status 200: A password reset email is sent with a link to reset the password.
* Status 400: Invalid email or user not found.

### 5. Reset Password

**Endpoint**: `/api/auth/reset-password`
**Method**: `POST`
**Request Body**:

```json
{
  "token": "reset-token-here",
  "newPassword": "newsecurepassword"
}
```

**Response**:

* Status 200: Password reset successfully.
* Status 400: Invalid or expired reset token.

### 6. Get User Profile (Protected Route)

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
├── services/            # Email and password reset services
│   └── emailService.js  # Email sending logic
├── .env                 # Environment variables
├── package.json         # Project metadata and dependencies
└── server.js            # Express server setup
```

### Key Changes in the Updated README:

* **Email Verification**: Users will receive an email to verify their account after registration.
* **Logout**: An endpoint is available to logout users and invalidate the JWT token.
* **Forgot Password**: An endpoint that sends a password reset email.
* **Password Reset**: Users can reset their password with a secure token sent to their email.
