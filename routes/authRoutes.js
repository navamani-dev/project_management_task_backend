const express = require("express");
const {
  register,
  login,
} = require("../controller/authController");

const authMiddleware = require("../auth/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

module.exports = router;