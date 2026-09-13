const {
  createProject,
  getProjectsByUser,
  getProjectById,
    updateProject,
    deleteProject
} = require("../model/projectModel");

const getProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await getProjectById(
      id,
      req.user.userId
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json({
      project,
    });

  } catch (error) {
    console.error("GET PROJECT ERROR:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};


const editProject = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      status,
      startDate,
      endDate,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Project name is required",
      });
    }

    const project = await updateProject(
      id,
      req.user.userId,
      name,
      description,
      status || "Not Started",
      startDate,
      endDate
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json({
      message: "Project updated successfully",
      project,
    });

  } catch (error) {
    console.error("UPDATE PROJECT ERROR:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const addProject = async (req, res) => {
  try {
    const {
      name,
      description,
      status,
      startDate,
      endDate,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Project name is required",
      });
    }

    const project = await createProject(
      name,
      description,
      status || "Not Started",
      startDate,
      endDate,
      req.user.userId
    );

    res.status(201).json({
      message: "Project created successfully",
      project,
    });

  } catch (error) {
    console.error("CREATE PROJECT ERROR:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};


// GET all projects
const getProjects = async (req, res) => {
  try {
    const { search, status } = req.query;

    console.log("SEARCH:", search);
    console.log("STATUS:", status);

    const projects = await getProjectsByUser(
      req.user.userId,
      search,
      status
    );

    res.status(200).json({
      projects,
    });

  } catch (error) {
    console.error("GET PROJECTS ERROR:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const removeProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await deleteProject(
      id,
      req.user.userId
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json({
      message: "Project deleted successfully",
    });

  } catch (error) {
    console.error("DELETE PROJECT ERROR:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};
module.exports = {
  addProject,
  getProjects,
  getProject,
    editProject,
    removeProject
};