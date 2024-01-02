const express = require("express");
const router = new express.Router();
const validateToken = require("../middleware/validateToken");
const {
  createStaff,
  getStaffById,
  getAllStaff,
  deleteStaffById,
} = require("../controllers/staffController");

router.post("/create", validateToken, createStaff);
router.get("/all", getAllStaff);
router.get("/:id", getStaffById);
router.delete("/delete/:id", validateToken, deleteStaffById);

module.exports = router;
