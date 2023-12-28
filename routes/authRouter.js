const express = require("express");
const router = new express.Router();
const validateToken = require("../middleware/validateToken");
const { registerUser, loginUser } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/validatetoken", validateToken, (req, res) => {
  res.json({ message: "Token is valid" });
});

module.exports = router;
