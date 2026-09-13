const express = require("express");

const {
  addTask,
  getTasks,
  getTask,
  editTask,
  removeTask,
  markTaskCompleted,
} = require("../controller/taskController");

const authMiddleware = require("../auth/authMiddleware");

const router = express.Router();


// CREATE TASK
router.post(
  "/projects/:projectId",
  authMiddleware,
  addTask
);


// GET ALL TASKS OF PROJECT
router.get(
  "/projects/:projectId",
  authMiddleware,
  getTasks
);


// GET TASK BY ID
router.get(
  "/:id",
  authMiddleware,
  getTask
);


// UPDATE TASK
router.put(
  "/:id",
  authMiddleware,
  editTask
);


// DELETE TASK
router.delete(
  "/:id",
  authMiddleware,
  removeTask
);


// COMPLETE TASK
router.patch(
  "/:id/complete",
  authMiddleware,
  markTaskCompleted
);


module.exports = router;