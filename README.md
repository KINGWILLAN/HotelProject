# travelEase

This is an hotel management application

## Table of Contents

- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Project Structure

The project consists of two main files:

- `index.js`: The entry point of the application.
- `server.js`: This file serves as the configuration hub for the server, handling tasks such as server configuration, connecting to the MongoDB database, implementing error middleware, and managing CORS settings..
- `config folder`: This directory contains environment variables for the application. It includes dev.js for development variables and prod.js for production variables, both exported from keys.js to be accessible throughout the application.
- `modelfolder`: This section houses database schemas for entities like users and services. It defines the schema and utility functions for interacting with MongoDB, as well as reusable functions applicable anywhere in the project.
- `controller folder:` This directory encompasses asynchronous functions responsible for performing CRUD operations and application business logic. It includes controllers for users, services, and uploads (for obtaining presigned URLs on Amazon AWS).

- `routers:` These are the routes providing access to the functions in the controllers. Users privileged with the necessary roles can interact with the RESTful API by utilizing these routes.

- `middlewares folder:` This section includes the authMiddleware for user authentication and errorMiddleware for handling errors within the Express application.

- `services:` This folder includes services like the email verification service.

- `Utils folder:` This section contains utility functions and variables shared across the server project. It also houses the database connection function, among other utilities.

In addition, the package.json file provides information about the project's dependencies and scripts:

- `package.json`: Configuration file for Node.js with project dependencies and scripts.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/arigbedeomobolaji/travelease.git

   ```

2. Navigate to the project directory:

   ```bash
   cd api

   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

1. To run the project in development mode::

   ```bash
   npm run dev

   ```

2. To start the project in production mode:

   ```bash
   npm start
   ```

## API Endpoints

1. User routes:

   ````http
   POST /api/v1/users
   This endpoint creates A new user.

   ```http
   PUT /api/v1/verify-email
   This endpoint verifies a newly created user.

   ````

2. Service Route

   ```http
   POST /api/v1/service
   create a new service.

   ```

3. Add a New User

   ```http
   POST /
   Adds a new user to the database. Requires a JSON payload in the request body.

   ```

4. Edit a User by ID

   ```http
   PUT /:id
   Edits a user with the specified ID. Requires a JSON payload in the request body.

   ```

5. Remove a User by ID

   ```http
   DELETE /:id
   Removes a user with the specified ID.
   ```

## Environment Variables

1. Make sure to create a .env file in the config directory with the following variables:

   ```env

   PORT=your_server_port
    CLIENT_URL
    MONGO_URL
    SALT_ROUNDS
    TOKEN_SECRET
    AWS_SES_SECRET_ACCESS_KEY
    AWS_SES_ACCESS_KEY
    AWS_SES_ARN
    AWS_SES_REGION
    AWS_S3_SECRET_ACCESS_KEY
    AWS_S3_ACCESS_KEY
    AWS_S3_ARN
    AWS_S3_REGION
    AWS_S3_BUCKET_NAME
   ```
