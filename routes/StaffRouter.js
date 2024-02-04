const express = require("express");
const router = new express.Router();
const validateToken = require("../middleware/validateToken");
const {
  createStaff,
  getStaffById,
  getAllStaff,
  deleteStaffById,
} = require("../controllers/staffController");

router.post("/create", createStaff);
router.get("/all", getAllStaff);
router.get("/:id", getStaffById);
router.delete("/delete/:id", deleteStaffById);

module.exports = router;
