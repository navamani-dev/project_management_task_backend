const express = require("express");

const {
  addProject,
  getProjects,
  getProject,
    editProject,
    removeProject
} = require("../controller/projectController");

const authMiddleware = require("../auth/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, addProject);
router.get("/", authMiddleware, getProjects);
router.get("/:id", authMiddleware, getProject);
router.put("/:id", authMiddleware, editProject);
router.delete("/:id", authMiddleware, removeProject);

module.exports = router;