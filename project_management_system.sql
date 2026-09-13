-- Project Management System Database
-- PostgreSQL Database: ismo

-- Create Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Projects table
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

-- Create Tasks table
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

-- Optional: clear existing project/task/user data and reset IDs
-- TRUNCATE TABLE tasks, projects, users
-- RESTART IDENTITY CASCADE;

-- Dummy user
-- Insert your user through the application instead of storing a plain password here.

-- Dummy projects
-- Replace user_id = 1 if your logged-in user's ID is different.

INSERT INTO projects
(name, description, status, start_date, end_date, user_id)
VALUES
(
    'E-Commerce Platform',
    'Online shopping platform with product and order management.',
    'In Progress',
    '2026-09-01',
    '2026-10-15',
    1
),
(
    'Employee Management System',
    'System for managing employees, departments and attendance.',
    'Completed',
    '2026-07-01',
    '2026-08-20',
    1
),
(
    'Learning Management System',
    'Platform for courses, students and learning materials.',
    'Not Started',
    '2026-10-01',
    '2026-12-15',
    1
),
(
    'Inventory Management System',
    'Application for tracking products, stock and suppliers.',
    'In Progress',
    '2026-08-15',
    '2026-10-30',
    1
),
(
    'Hospital Management System',
    'System for managing patients, doctors and appointments.',
    'Not Started',
    '2026-11-01',
    '2027-01-15',
    1
),
(
    'Task Tracking Application',
    'Application for creating and tracking project tasks.',
    'Completed',
    '2026-06-01',
    '2026-07-15',
    1
);

-- Dummy tasks
INSERT INTO tasks
(name, description, priority, status, due_date, project_id)
VALUES
(
    'Create Product API',
    'Develop REST API for product management.',
    'High',
    'Completed',
    '2026-09-08',
    1
),
(
    'Build Shopping Cart',
    'Implement add, update and remove cart items.',
    'High',
    'In Progress',
    '2026-09-20',
    1
),
(
    'Payment Integration',
    'Integrate payment gateway into the application.',
    'High',
    'Pending',
    '2026-10-01',
    1
),
(
    'Employee CRUD',
    'Implement employee create, read, update and delete operations.',
    'High',
    'Completed',
    '2026-07-15',
    2
),
(
    'Attendance Module',
    'Develop employee attendance tracking.',
    'Medium',
    'Completed',
    '2026-08-01',
    2
),
(
    'Course Module',
    'Create course management functionality.',
    'High',
    'Pending',
    '2026-10-20',
    3
),
(
    'Student Registration',
    'Implement student registration and profile management.',
    'Medium',
    'Pending',
    '2026-11-01',
    3
),
(
    'Stock API',
    'Create API for stock management.',
    'High',
    'In Progress',
    '2026-09-25',
    4
),
(
    'Supplier Module',
    'Implement supplier management.',
    'Medium',
    'Pending',
    '2026-10-05',
    4
),
(
    'Patient Registration',
    'Create patient registration module.',
    'High',
    'Pending',
    '2026-11-15',
    5
),
(
    'Appointment Module',
    'Develop doctor appointment scheduling.',
    'Medium',
    'Pending',
    '2026-12-01',
    5
),
(
    'Task Dashboard',
    'Create dashboard for task tracking.',
    'Low',
    'Completed',
    '2026-07-10',
    6
);

-- Check inserted data
SELECT * FROM users;
SELECT * FROM projects;
SELECT * FROM tasks;
