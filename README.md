1. Introduction

Project Title
Adedayo's Product Management Backend API

Purpose
This backend API allows users to create accounts and manage their own products. Each user can add, view, update, and delete products they created. The system has two user roles:

Users: Can manage only their own products
Admins: Can manage their products + view all users and delete any user account

The API handles user registration, login, and secure authentication and authorization using JWT tokens.

Technology Stack
-Node.js
-Express
-MongoDB
-Mongoose 
-bcryptjs
-jsonwebtoken 
-dotenv

2. API Reference
All endpoints are prefixed with /api/v1.

User Endpoints
These routes are for user registration and login.

-REGISTER:
Endpoint: POST /api/v1/user/register - to register

{
  "userName": "john_doe",
  "email": "john.doe@example.com",
  "password": "strongpassword123"
}

Status Codes: 201 Created
Body (Success):

{
  "success": true,
  "message": "user register successfully",
  "newUser": {
    "userName": "john_doe",
    "email": "john.doe@example.com",
    "role": "user",
    "_id": "60c72b2f9b1d8e001f3f7e1a",
    "createdAt": "2023-10-27T10:00:00.000Z",
    "updatedAt": "2023-10-27T10:00:00.000Z",
    "__v": 0
  }
}

-LOGIN:
Endpoint: POST /api/v1/user/login - to login

{
  "email": "john.doe@example.com",
  "password": "strongpassword123"
}


Status Codes: 200 OK, 401 Unauthorized
Body (Success):

{
  "success": true,
  "message": "Login successful",
  "user": {
    "userName": "john_doe",
    "email": "john.doe@example.com",
    "role": "user",
    "_id": "60c72b2f9b1d8e001f3f7e1a",
    "createdAt": "2023-10-27T10:00:00.000Z",
    "updatedAt": "2023-10-27T10:00:00.000Z",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

-GET ALL PRODUCT
These routes require a valid user token and are protected by the authMiddleware.

Endpoint: GET /api/v1/products
Description: Retrieves all products created by the authenticated user.

Status Codes: 200 OK
Body (Success):

{
  "success": true,
  "getProducts": [
    {
      "item": "Laptop",
      "price": 1200,
      "description": "High-performance laptop",
      "status": "In Stock",
      "seller": {
        "id": "60c72b2f9b1d8e001f3f7e1a",
        "name": "john_doe"
      },
      "_id": "60c72b2f9b1d8e001f3f7e1b"
    }
  ]
}

-CREATE PRODUCT
Endpoint: POST /api/v1/products
Description: Creates a new product for the authenticated user.

{
  "item": "Smartphone",
  "price": 799.99,
  "description": "Latest model smartphone",
  "status": "In Stock"
}

Status Codes: 201 Created

-GET SINGLE PRODUCT
Status Codes: 200 OK, 404 Not Found
Endpoint: GET /api/v1/products/:productId
Description: Retrieves a single product by ID, owned by the authenticated user.

-UPDATE PRODUCT
Status Codes: 200 OK, 404 Not Found
Endpoint: PATCH /api/v1/products/:productId
Description: Updates a product by ID, owned by the authenticated user.

{
  "price": 750.00
}

-DELETE PRODUCT
Status Codes: 200 OK, 404 Not Found
Endpoint: DELETE /api/v1/products/:productId
Description: Deletes a product by ID, owned by the authenticated user.


-ADMIN USER
Status Codes: 200 OK, 404 Not Found
These routes require a valid JWT from an admin user and are protected by the adminMiddleware.

-ADMIN GET
Status Codes: 200 OK, 404 NOT FOUND
Endpoint: GET /api/v1/admin/allUsers
Description: Retrieves all users in the database.


Status Codes: 200 OK, 403 Forbidden, 404 NOT FOUND
Endpoint: DELETE /api/v1/admin/deleteUser/:userId
Description: Deletes a user by ID. An admin cannot delete another admin.


3. Authentication

-AUTHENTICATION FLOW
A user registers via the /api/v1/user/register endpoint.
The user logs in using the /api/v1/user/login endpoint, providing their email and password.
Upon successful login, the server returns a JSON Web Token (JWT).

This token must be stored securely on the client-side.

Token Usage
To access protected routes, the JWT must be included in the Authorization header of every request.

Example:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
JWT Structure
The JWT is signed with JWT_SECRET and contains the following payload:

-userId: The unique ID of the user.
-name: The user's userName.
-role: The user's role (user or admin).

4. Database Schema
The application uses two main Mongoose schemas: ProductSchema and UserSchema.

User Schema
Field	Type	Constraints	Description
userName	String	required, unique	The user's unique username.
email	String	required, trim, unique, match	The user's unique email.
password	String	required	The user's hashed password.
role	String	enum, default	The user's role, either 'user' or 'admin'. Defaults to 'user'.
Relationships: A user can create many products.

Product Schema
Field	Type	Constraints	Description
item	String	required, trim	The name of the product.
price	Number	required	The price of the product.
description	String		A description of the product.
status	String	required, enum, default	The stock status, either 'In Stock' or 'out of stock'.
seller	Mixed	ref, required	A reference object to the user who created the product.
Relationships: A product belongs to one user. The seller field stores the id and name of the user.

5. Deployment
Environment Variables

-MONGO_URI: The connection string for your MongoDB database.
-JWT_SECRET: A secret key used to sign and verify JWTs.
-JWT_LIFESPAN: The expiration time for the JWT (e.g., 1d for one day).
-PORT: The port on which the server will listen.

Deployment Steps
Set up my cloud provider (render)

SET UP-------
-MONGO_URI,
-JWT_SECRET,
-JWT_LIFESPAN.

Deploy the application code to the server. pushed code to a Git repository linked to the deployment service.


