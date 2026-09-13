const {
  createTask,
  getTasksByProject,
  getTaskById,
  updateTask,
  deleteTask,
  completeTask,
} = require("../model/taskModel");


// CREATE TASK
const addTask = async (req, res) => {
  try {
    const { projectId } = req.params;

    const {
      name,
      description,
      priority,
      status,
      dueDate,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Task name is required",
      });
    }

    const task = await createTask(
      name,
      description,
      priority || "Low",
      status || "Pending",
      dueDate,
      projectId
    );

    res.status(201).json({
      message: "Task created successfully",
      task,
    });

  } catch (error) {
    console.error("CREATE TASK ERROR:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};


// GET ALL TASKS
const getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    const {
      search,
      status,
      priority,
    } = req.query;

    const tasks = await getTasksByProject(
      projectId,
      req.user.userId,
      search,
      status,
      priority
    );

    res.status(200).json({
      tasks,
    });

  } catch (error) {
    console.error("GET TASKS ERROR:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};


// GET TASK BY ID
const getTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await getTaskById(
      id,
      req.user.userId
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      task,
    });

  } catch (error) {
    console.error("GET TASK ERROR:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};


// UPDATE TASK
const editTask = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      priority,
      status,
      dueDate,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Task name is required",
      });
    }

    const task = await updateTask(
      id,
      req.user.userId,
      name,
      description,
      priority || "Low",
      status || "Pending",
      dueDate
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task,
    });

  } catch (error) {
    console.error("UPDATE TASK ERROR:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};


// DELETE TASK
const removeTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await deleteTask(
      id,
      req.user.userId
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });

  } catch (error) {
    console.error("DELETE TASK ERROR:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};


// COMPLETE TASK
const markTaskCompleted = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await completeTask(
      id,
      req.user.userId
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task completed successfully",
      task,
    });

  } catch (error) {
    console.error("COMPLETE TASK ERROR:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};


module.exports = {
  addTask,
  getTasks,
  getTask,
  editTask,
  removeTask,
  markTaskCompleted,
};