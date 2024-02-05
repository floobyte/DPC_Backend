const express = require("express");
const validateToken = require("../middleware/validateToken");
const router = new express.Router();
const {
  getAllUsers,
  findUserById,
  deleteUserById,
  updateUser,
  findUserByEmailId,
} = require("../controllers/userController");

router.get("/all", getAllUsers);
router.get("/:id", findUserById);
router.get("/email/:emailId", findUserByEmailId);
router.delete("/delete/:id", validateToken, deleteUserById);
router.put("/update/:id", updateUser);

module.exports = router;
