# Project Management System - Database Schema

## Database

PostgreSQL

The application uses a relational PostgreSQL database with three main tables:

- users
- projects
- tasks

---

# 1. Entity Relationship Diagram

```text
┌──────────────────────────┐
│          USERS           │
├──────────────────────────┤
│ PK  id                   │
│     full_name            │
│     email                │
│     password             │
│     created_at           │
└────────────┬─────────────┘
             │
             │ 1
             │
             │ Many
             ▼
┌──────────────────────────┐
│        PROJECTS          │
├──────────────────────────┤
│ PK  id                   │
│     name                 │
│     description          │
│     status               │
│     start_date           │
│     end_date             │
│     created_at            │
│ FK  user_id              │
└────────────┬─────────────┘
             │
             │ 1
             │
             │ Many
             ▼
┌──────────────────────────┐
│          TASKS           │
├──────────────────────────┤
│ PK  id                   │
│     name                 │
│     description          │
│     priority             │
│     status               │
│     due_date             │
│     created_at           │
│ FK  project_id           │
└──────────────────────────┘
```

---

# 2. Table: users

The `users` table stores registered user information.

| Column | Data Type | Constraints | Description |
|--------|-----------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Unique user ID |
| full_name | VARCHAR(100) | NOT NULL | User full name |
| email | VARCHAR(150) | UNIQUE, NOT NULL | User email address |
| password | VARCHAR(255) | NOT NULL | Bcrypt hashed password |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Account creation date |

### SQL Schema

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# 3. Table: projects

The `projects` table stores projects created by users.

| Column | Data Type | Constraints | Description |
|--------|-----------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Unique project ID |
| name | VARCHAR(150) | NOT NULL | Project name |
| description | TEXT | - | Project description |
| status | VARCHAR(20) | NOT NULL, CHECK | Project status |
| start_date | DATE | - | Project start date |
| end_date | DATE | - | Project end date |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Project creation date |
| user_id | INTEGER | NOT NULL, FOREIGN KEY | Owner user ID |

### Allowed Project Status

- Not Started
- In Progress
- Completed

### SQL Schema

```sql
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'Not Started',
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER NOT NULL,
    CONSTRAINT fk_project_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT project_status_check
        CHECK (status IN ('Not Started', 'In Progress', 'Completed'))
);
```

---

# 4. Table: tasks

The `tasks` table stores tasks that belong to projects.

| Column | Data Type | Constraints | Description |
|--------|-----------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Unique task ID |
| name | VARCHAR(150) | NOT NULL | Task name |
| description | TEXT | - | Task description |
| priority | VARCHAR(10) | NOT NULL, CHECK | Task priority |
| status | VARCHAR(20) | NOT NULL, CHECK | Task status |
| due_date | DATE | - | Task due date |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Task creation date |
| project_id | INTEGER | NOT NULL, FOREIGN KEY | Parent project ID |

### Allowed Task Priority

- Low
- Medium
- High

### Allowed Task Status

- Pending
- In Progress
- Completed

### SQL Schema

```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    priority VARCHAR(10) NOT NULL DEFAULT 'Low',
    status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    project_id INTEGER NOT NULL,
    CONSTRAINT fk_task_project
        FOREIGN KEY (project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE,
    CONSTRAINT task_priority_check
        CHECK (priority IN ('Low', 'Medium', 'High')),
    CONSTRAINT task_status_check
        CHECK (status IN ('Pending', 'In Progress', 'Completed'))
);
```

---

# 5. Relationships

## Users → Projects

Relationship: **One-to-Many**

One user can create multiple projects.

```text
users.id
    ↓
projects.user_id
```

The `projects.user_id` column references `users.id`.

---

## Projects → Tasks

Relationship: **One-to-Many**

One project can contain multiple tasks.

```text
projects.id
    ↓
tasks.project_id
```

The `tasks.project_id` column references `projects.id`.

---

# 6. Foreign Keys

## projects.user_id

```text
projects.user_id → users.id
```

This identifies the user who owns the project.

## tasks.project_id

```text
tasks.project_id → projects.id
```

This identifies the project to which the task belongs.

---

# 7. Cascade Delete

The database uses `ON DELETE CASCADE`.

### When a user is deleted

The user's projects are automatically deleted.

```text
User
 ↓
Projects
```

### When a project is deleted

The project's tasks are automatically deleted.

```text
Project
 ↓
Tasks
```

This maintains referential integrity.

---

# 8. Normalization

The database separates users, projects, and tasks into different related tables.

This avoids unnecessary duplication and maintains a clear relational structure.

The relationships are represented using foreign keys:

```text
Users
  |
  | 1 : Many
  ▼
Projects
  |
  | 1 : Many
  ▼
Tasks
```

---

# 9. Database Flow

When a user logs in:

```text
User
 ↓
JWT Authentication
 ↓
Authenticated User ID
 ↓
Projects owned by User
 ↓
Tasks belonging to User's Projects
```

The backend uses the authenticated user's ID to restrict project and task access.

---

# 10. Summary

| Table | Purpose |
|-------|---------|
| users | Stores user accounts and authentication information |
| projects | Stores projects created by users |
| tasks | Stores tasks belonging to projects |

### Relationship Summary

```text
users
  1
  |
  | Many
  ↓
projects
  1
  |
  | Many
  ↓
tasks
```

The database uses PostgreSQL, primary keys, foreign keys, constraints, and cascade deletion to maintain data integrity.
