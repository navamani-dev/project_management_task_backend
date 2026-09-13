const express = require("express");

const {
  dashboard,
} = require("../controller/dashboardController");

const authMiddleware = require("../auth/authMiddleware");

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  dashboard
);

module.exports = router;