const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const validateToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).send("Access denied");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ username: decoded.user });

    if (!user) return res.status(401).send("Access denied");

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
};

module.exports = validateToken;
