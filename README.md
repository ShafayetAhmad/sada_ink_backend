# Sada.Ink Blogging Platform Backend

## Overview

This project is a backend for a blogging platform that allows users to create, update, and delete their blogs. It supports two roles: Admin and User. Admins have special permissions to manage users and their blogs, while regular users can perform CRUD operations on their own blogs. The platform includes secure authentication, role-based access control, and a public API for viewing blogs with search, sort, and filter functionalities.

## Features

### User Roles

#### Admin:

- Created manually in the database with predefined credentials.
- Can delete any blog.
- Can block users by updating the `isBlocked` property.
- Cannot update any blog.

#### User:

- Can register and log in.
- Can create, update, and delete their own blogs.
- Cannot perform admin actions.

### Authentication & Authorization

- **Authentication:** Users must log in to perform write, update, and delete operations.
- **Authorization:** Differentiates between Admin and User roles, ensuring secure access control.

### Blog API

- Public API to view blogs with title, content, author details, and other information.
- Search, sort, and filter functionalities.

### Error Handling

- Handles validation errors, authentication issues, and server errors with meaningful responses.

## Technologies Used

- **Programming Language:** TypeScript
- **Framework:** Node.js with Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Validation:** Zod

## Models

### User Model

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` | Full name of the user. |
| `email` | `string` | Email address, used for authentication. |
| `password` | `string` | Password, stored securely. |
| `role` | `string` | Role of the user: `admin` or `user`. Default: `user`. |
| `isBlocked` | `boolean` | Indicates if the user is blocked. Default: `false`. |
| `createdAt` | `Date` | Timestamp when the user was created. |
| `updatedAt` | `Date` | Timestamp of the last update to the user. |

### Blog Model

| Field | Type | Description |
| --- | --- | --- |
| `title` | `string` | Title of the blog post. |
| `content` | `string` | Main body of the blog post. |
| `author` | `ObjectId` | Reference to the `User` model. |
| `isPublished` | `boolean` | Indicates if the blog is published. Default: `true`. |
| `createdAt` | `Date` | Timestamp when the blog was created. |
| `updatedAt` | `Date` | Timestamp of the last update to the blog. |

## API Endpoints

### 1. Authentication

#### Register User

**POST** `/api/auth/register`

- Registers a new user.
- Request Body:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```

#### Login User

**POST** `/api/auth/login`

- Authenticates a user and generates a JWT token.
- Request Body:
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```

### 2. Blog Management

#### Create Blog

**POST** `/api/blogs`

- Allows a logged-in user to create a blog.
- Request Body:
  ```json
  {
    "title": "My First Blog",
    "content": "This is the content of my blog."
  }
  ```

#### Update Blog

**PATCH** `/api/blogs/:id`

- Allows a logged-in user to update their own blog by its ID.
- Request Body:
  ```json
  {
    "title": "Updated Blog Title",
    "content": "Updated content."
  }
  ```

#### Delete Blog

**DELETE** `/api/blogs/:id`

- Allows a logged-in user to delete their own blog by its ID.

#### Get All Blogs (Public)

**GET** `/api/blogs`

- Provides a public API to fetch all blogs with options for searching, sorting, and filtering.
- Query Parameters:
  - `search`: Search blogs by title or content.
  - `sortBy`: Sort blogs by fields like `createdAt` or `title`.
  - `sortOrder`: Sorting order: `asc` or `desc`.
  - `filter`: Filter blogs by author ID.

### 3. Admin Actions

#### Block User

**PATCH** `/api/admin/users/:userId/block`

- Blocks a user by setting `isBlocked` to `true`.

#### Delete Blog

**DELETE** `/api/admin/blogs/:id`

- Deletes any blog by its ID.

## Error Handling

Consistent error responses with the following format:

```json
{
  "success": false,
  "message": "Error message",
  "statusCode": 400,
  "error": { "details": "Additional details" },
  "stack": "Error stack trace"
}
```

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/ShafayetAhmad/sada_ink_backend.git
   cd sada_ink_backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```env
   PORT=5000
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   NODE_ENV=development
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
5. The server will run at `http://localhost:5000`.

## Testing

- Use tools like Postman to test the API endpoints.

## Live URL

The backend is deployed on Vercel. You can access the API at [https://sada-ink-backend-fv9j.vercel.app](https://sada-ink-backend-fv9j.vercel.app).

## License

This project is licensed under the MIT License.
