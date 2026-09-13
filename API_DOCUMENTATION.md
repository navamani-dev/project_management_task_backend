# Project Management System - API Documentation

## Base URL

Local: `http://localhost:5000/api`

Production: `https://project-management-task-backend-kohl.vercel.app/api`

---

# Authentication

The API uses JWT (JSON Web Token) authentication.

For protected APIs, send the token in the request header:

`Authorization: Bearer <token>`

---

# 1. Authentication APIs

## 1.1 Register User

**POST** `/api/auth/register`

### Request Body

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "12345678"
}
```

### Success Response

**201 Created**

```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "full_name": "John Doe",
    "email": "john@example.com",
    "created_at": "2026-09-13T10:00:00.000Z"
  }
}
```

### Possible Errors

**400 Bad Request**
```json
{
  "message": "All fields are required"
}
```

**409 Conflict**
```json
{
  "message": "Email already registered"
}
```

---

## 1.2 Login User

**POST** `/api/auth/login`

### Request Body

```json
{
  "email": "john@example.com",
  "password": "12345678"
}
```

### Success Response

**200 OK**

```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN"
}
```

### Invalid Credentials

**401 Unauthorized**

```json
{
  "message": "Invalid email or password"
}
```

---

## 1.3 Get User Profile

**GET** `/api/auth/profile`

### Headers

`Authorization: Bearer <token>`

### Success Response

**200 OK**

```json
{
  "id": 1,
  "full_name": "John Doe",
  "email": "john@example.com",
  "created_at": "2026-09-13T10:00:00.000Z"
}
```

---

# 2. Project APIs

All project APIs require JWT authentication.

## 2.1 Create Project

**POST** `/api/projects`

### Headers

`Authorization: Bearer <token>`

`Content-Type: application/json`

### Request Body

```json
{
  "name": "E-Commerce Platform",
  "description": "Online shopping platform",
  "status": "In Progress",
  "startDate": "2026-09-01",
  "endDate": "2026-10-15"
}
```

### Supported Status Values

- Not Started
- In Progress
- Completed

### Success Response

**201 Created**

```json
{
  "message": "Project created successfully",
  "project": {}
}
```

---

## 2.2 Get All Projects

**GET** `/api/projects`

### Headers

`Authorization: Bearer <token>`

### Success Response

**200 OK**

```json
{
  "message": "Projects fetched successfully",
  "projects": []
}
```

---

## 2.3 Search Projects

**GET** `/api/projects?search=<keyword>`

Example:

`GET /api/projects?search=E-Commerce`

---

## 2.4 Filter Projects by Status

**GET** `/api/projects?status=<status>`

Example:

`GET /api/projects?status=Completed`

Supported values:

- Not Started
- In Progress
- Completed

---

## 2.5 Search and Filter Projects

Example:

`GET /api/projects?search=Platform&status=In%20Progress`

---

## 2.6 Get Project by ID

**GET** `/api/projects/:id`

Example:

`GET /api/projects/1`

### Headers

`Authorization: Bearer <token>`

### Success Response

**200 OK**

```json
{
  "message": "Project fetched successfully",
  "project": {}
}
```

---

## 2.7 Update Project

**PUT** `/api/projects/:id`

Example:

`PUT /api/projects/1`

### Headers

`Authorization: Bearer <token>`

`Content-Type: application/json`

### Request Body

```json
{
  "name": "Updated E-Commerce Platform",
  "description": "Updated project description",
  "status": "Completed",
  "startDate": "2026-09-01",
  "endDate": "2026-10-30"
}
```

### Success Response

**200 OK**

```json
{
  "message": "Project updated successfully",
  "project": {}
}
```

---

## 2.8 Delete Project

**DELETE** `/api/projects/:id`

Example:

`DELETE /api/projects/1`

### Headers

`Authorization: Bearer <token>`

### Success Response

**200 OK**

```json
{
  "message": "Project deleted successfully"
}
```

---

# 3. Task APIs

All task APIs require JWT authentication.

Tasks belong to a project.

## 3.1 Create Task

**POST** `/api/tasks/projects/:projectId`

Example:

`POST /api/tasks/projects/1`

### Headers

`Authorization: Bearer <token>`

`Content-Type: application/json`

### Request Body

```json
{
  "name": "Design Product Page",
  "description": "Create responsive product page",
  "priority": "High",
  "status": "Pending",
  "dueDate": "2026-09-20"
}
```

### Supported Priority Values

- Low
- Medium
- High

### Supported Status Values

- Pending
- In Progress
- Completed

### Success Response

**201 Created**

```json
{
  "message": "Task created successfully",
  "task": {}
}
```

---

## 3.2 Get All Tasks of a Project

**GET** `/api/tasks/projects/:projectId`

Example:

`GET /api/tasks/projects/1`

### Headers

`Authorization: Bearer <token>`

### Success Response

**200 OK**

```json
{
  "message": "Tasks fetched successfully",
  "tasks": []
}
```

---

## 3.3 Search Tasks

**GET** `/api/tasks/projects/:projectId?search=<keyword>`

Example:

`GET /api/tasks/projects/1?search=Design`

---

## 3.4 Filter Tasks by Status

**GET** `/api/tasks/projects/:projectId?status=<status>`

Example:

`GET /api/tasks/projects/1?status=Completed`

Supported values:

- Pending
- In Progress
- Completed

---

## 3.5 Filter Tasks by Priority

**GET** `/api/tasks/projects/:projectId?priority=<priority>`

Example:

`GET /api/tasks/projects/1?priority=High`

Supported values:

- Low
- Medium
- High

---

## 3.6 Search and Filter Tasks

Example:

`GET /api/tasks/projects/1?search=Design&status=Pending&priority=High`

---

## 3.7 Get Task by ID

**GET** `/api/tasks/:id`

Example:

`GET /api/tasks/1`

### Headers

`Authorization: Bearer <token>`

### Success Response

**200 OK**

```json
{
  "message": "Task fetched successfully",
  "task": {}
}
```

---

## 3.8 Update Task

**PUT** `/api/tasks/:id`

Example:

`PUT /api/tasks/1`

### Headers

`Authorization: Bearer <token>`

`Content-Type: application/json`

### Request Body

```json
{
  "name": "Updated Product Page",
  "description": "Updated task description",
  "priority": "Medium",
  "status": "In Progress",
  "dueDate": "2026-09-25"
}
```

### Success Response

**200 OK**

```json
{
  "message": "Task updated successfully",
  "task": {}
}
```

---

## 3.9 Complete Task

**PATCH** `/api/tasks/:id/complete`

Example:

`PATCH /api/tasks/1/complete`

### Headers

`Authorization: Bearer <token>`

### Success Response

**200 OK**

```json
{
  "message": "Task marked as completed",
  "task": {
    "id": 1,
    "status": "Completed"
  }
}
```

---

## 3.10 Delete Task

**DELETE** `/api/tasks/:id`

Example:

`DELETE /api/tasks/1`

### Headers

`Authorization: Bearer <token>`

### Success Response

**200 OK**

```json
{
  "message": "Task deleted successfully"
}
```

---

# 4. Dashboard API

## 4.1 Get Dashboard Statistics

**GET** `/api/dashboard`

### Headers

`Authorization: Bearer <token>`

### Success Response

**200 OK**

```json
{
  "message": "Dashboard statistics fetched successfully",
  "stats": {
    "projects": {
      "total_projects": "6",
      "not_started": "2",
      "in_progress": "2",
      "completed": "2"
    },
    "tasks": {
      "total_tasks": "7",
      "pending": "2",
      "in_progress": "2",
      "completed": "3"
    }
  }
}
```

---

# 5. Authentication & Security

## JWT Authentication

Protected APIs require a valid JWT token.

Header format:

`Authorization: Bearer <token>`

## Password Security

User passwords are hashed using bcrypt before storing them in PostgreSQL.

Passwords are never stored as plain text.

## User Data Protection

Users can access only their own projects and tasks.

## SQL Injection Prevention

Database queries use parameterized SQL queries.

Example:

```js
pool.query(
  "SELECT * FROM users WHERE email = $1",
  [email]
);
```

User input is not directly concatenated into SQL queries.

## Authentication Rate Limiting

Authentication routes are protected using rate limiting.

Rate limiting is applied to:

`/api/auth`

This helps prevent excessive login and registration attempts.

---

# 6. HTTP Status Codes

| Status Code | Meaning |
|-------------|---------|
| 200 | Request successful |
| 201 | Resource created |
| 400 | Bad request |
| 401 | Unauthorized |
| 404 | Resource not found |
| 409 | Conflict |
| 500 | Internal server error |

---

# 7. API Summary

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/profile | Get authenticated user profile |

## Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/projects | Create project |
| GET | /api/projects | Get all projects |
| GET | /api/projects/:id | Get project by ID |
| PUT | /api/projects/:id | Update project |
| DELETE | /api/projects/:id | Delete project |

Project query parameters:

- `search`
- `status`

Example:

`GET /api/projects?search=Platform&status=In%20Progress`

## Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/tasks/projects/:projectId | Create task |
| GET | /api/tasks/projects/:projectId | Get project tasks |
| GET | /api/tasks/:id | Get task by ID |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |
| PATCH | /api/tasks/:id/complete | Complete task |

Task query parameters:

- `search`
- `status`
- `priority`

Example:

`GET /api/tasks/projects/1?search=Design&status=Pending&priority=High`

## Dashboard

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/dashboard | Get dashboard statistics |

---

# 8. Database Relationships

The application uses PostgreSQL with the following relationships:

```text
Users
  |
  | 1 : Many
  v
Projects
  |
  | 1 : Many
  v
Tasks
```

### Users -> Projects

One user can have multiple projects.

```text
users.id
    |
    v
projects.user_id
```

### Projects -> Tasks

One project can have multiple tasks.

```text
projects.id
    |
    v
tasks.project_id
```

Foreign keys are used to maintain referential integrity.

Projects and their related tasks are deleted automatically when a project is deleted using `ON DELETE CASCADE`.

---

# 9. Testing

The APIs can be tested using Postman.

Recommended testing order:

1. Register a user
2. Login
3. Copy the JWT token
4. Add the token to the Authorization header
5. Create a project
6. Get projects
7. Update project
8. Create tasks
9. Get tasks
10. Update task
11. Complete task
12. Delete task
13. Check dashboard statistics

---

# 10. Production API

Production Backend:

`https://project-management-task-backend-kohl.vercel.app/api`

Production Frontend:

`https://project-management-task-frontend.vercel.app`

The frontend communicates with the production backend API, and the backend connects to the PostgreSQL database hosted on Neon.
