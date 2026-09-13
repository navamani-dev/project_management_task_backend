const pool = require("../config/db");

const createProject = async (
  name,
  description,
  status,
  startDate,
  endDate,
  userId
) => {
  const result = await pool.query(
    `INSERT INTO projects
    (name, description, status, start_date, end_date, user_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,
    [name, description, status, startDate, endDate, userId]
  );

  return result.rows[0];
};

const getProjectsByUser = async (userId, search, status) => {
  const values = [userId];

  let query = `
    SELECT *
    FROM projects
    WHERE user_id = $1
  `;

  if (search) {
    values.push(`%${search}%`);

    query += `
      AND name ILIKE $${values.length}
    `;
  }

  if (status) {
    values.push(status);

    query += `
      AND status = $${values.length}
    `;
  }

  query += `
    ORDER BY created_at DESC
  `;

  const result = await pool.query(query, values);

  return result.rows;
};

const getProjectById = async (projectId, userId) => {
  const result = await pool.query(
    `SELECT * FROM projects
     WHERE id = $1 AND user_id = $2`,
    [projectId, userId]
  );

  return result.rows[0];
};

const updateProject = async (
  projectId,
  userId,
  name,
  description,
  status,
  startDate,
  endDate
) => {
  const result = await pool.query(
    `UPDATE projects
     SET name = $1,
         description = $2,
         status = $3,
         start_date = $4,
         end_date = $5
     WHERE id = $6 AND user_id = $7
     RETURNING *`,
    [
      name,
      description,
      status,
      startDate,
      endDate,
      projectId,
      userId,
    ]
  );

  return result.rows[0];
};

const deleteProject = async (projectId, userId) => {
  const result = await pool.query(
    `DELETE FROM projects
     WHERE id = $1 AND user_id = $2
     RETURNING *`,
    [projectId, userId]
  );

  return result.rows[0];
};


module.exports = {
  createProject,
  getProjectsByUser,
  getProjectById,
    updateProject,
    deleteProject,
};