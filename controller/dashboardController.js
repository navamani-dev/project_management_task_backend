const {
  getDashboardStats,
} = require("../model/dashboardModel");

const dashboard = async (req, res) => {
  try {
    const stats = await getDashboardStats(
      req.user.userId
    );

    res.status(200).json({
      message: "Dashboard statistics fetched successfully",
      stats,
    });

  } catch (error) {
    console.error("DASHBOARD ERROR:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  dashboard,
};