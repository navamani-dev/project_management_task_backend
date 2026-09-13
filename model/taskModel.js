const pool = require("../config/db");

// CREATE TASK
const createTask = async (
  name,
  description,
  priority,
  status,
  dueDate,
  projectId
) => {
  const result = await pool.query(
    `INSERT INTO tasks
    (name, description, priority, status, due_date, project_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,
    [
      name,
      description,
      priority,
      status,
      dueDate,
      projectId,
    ]
  );

  return result.rows[0];
};


// GET ALL TASKS OF A PROJECT
const getTasksByProject = async (
  projectId,
  userId,
  search,
  status,
  priority
) => {
  const values = [projectId, userId];

  let query = `
    SELECT tasks.*
    FROM tasks
    INNER JOIN projects
      ON tasks.project_id = projects.id
    WHERE tasks.project_id = $1
      AND projects.user_id = $2
  `;

  if (search) {
    values.push(`%${search}%`);

    query += `
      AND tasks.name ILIKE $${values.length}
    `;
  }

  if (status) {
    values.push(status);

    query += `
      AND tasks.status = $${values.length}
    `;
  }

  if (priority) {
    values.push(priority);

    query += `
      AND tasks.priority = $${values.length}
    `;
  }

  query += `
    ORDER BY tasks.created_at DESC
  `;

  const result = await pool.query(query, values);

  return result.rows;
};


// GET TASK BY ID
const getTaskById = async (taskId, userId) => {
  const result = await pool.query(
    `SELECT tasks.*
     FROM tasks
     INNER JOIN projects
       ON tasks.project_id = projects.id
     WHERE tasks.id = $1
       AND projects.user_id = $2`,
    [taskId, userId]
  );

  return result.rows[0];
};


// UPDATE TASK
const updateTask = async (
  taskId,
  userId,
  name,
  description,
  priority,
  status,
  dueDate
) => {
  const result = await pool.query(
    `UPDATE tasks
     SET name = $1,
         description = $2,
         priority = $3,
         status = $4,
         due_date = $5
     WHERE tasks.id = $6
       AND tasks.project_id IN (
         SELECT id
         FROM projects
         WHERE user_id = $7
       )
     RETURNING tasks.*`,
    [
      name,
      description,
      priority,
      status,
      dueDate,
      taskId,
      userId,
    ]
  );

  return result.rows[0];
};


// DELETE TASK
const deleteTask = async (taskId, userId) => {
  const result = await pool.query(
    `DELETE FROM tasks
     WHERE id = $1
       AND project_id IN (
         SELECT id
         FROM projects
         WHERE user_id = $2
       )
     RETURNING *`,
    [taskId, userId]
  );

  return result.rows[0];
};


// COMPLETE TASK
const completeTask = async (taskId, userId) => {
  const result = await pool.query(
    `UPDATE tasks
     SET status = 'Completed'
     WHERE id = $1
       AND project_id IN (
         SELECT id
         FROM projects
         WHERE user_id = $2
       )
     RETURNING *`,
    [taskId, userId]
  );

  return result.rows[0];
};


module.exports = {
  createTask,
  getTasksByProject,
  getTaskById,
  updateTask,
  deleteTask,
  completeTask,
};