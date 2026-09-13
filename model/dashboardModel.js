const pool = require("../config/db");

const getDashboardStats = async (userId) => {
  const projectResult = await pool.query(
    `SELECT
      COUNT(*) AS total_projects,
      COUNT(*) FILTER (WHERE projects.status = 'Not Started') AS not_started,
      COUNT(*) FILTER (WHERE projects.status = 'In Progress') AS in_progress,
      COUNT(*) FILTER (WHERE projects.status = 'Completed') AS completed
     FROM projects
     WHERE projects.user_id = $1`,
    [userId]
  );

  const taskResult = await pool.query(
    `SELECT
      COUNT(*) AS total_tasks,
      COUNT(*) FILTER (WHERE tasks.status = 'Pending') AS pending,
      COUNT(*) FILTER (WHERE tasks.status = 'In Progress') AS in_progress,
      COUNT(*) FILTER (WHERE tasks.status = 'Completed') AS completed
     FROM tasks
     INNER JOIN projects
       ON tasks.project_id = projects.id
     WHERE projects.user_id = $1`,
    [userId]
  );

  return {
    projects: projectResult.rows[0],
    tasks: taskResult.rows[0],
  };
};

module.exports = {
  getDashboardStats,
};