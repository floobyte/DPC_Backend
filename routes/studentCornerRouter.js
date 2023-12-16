const express = require("express");
const router = new express.Router();
const validateToken = require("../middleware/validateToken");
const {
  createStudentCorner,
  getAllStudentCorner,
  getStudentCornerById,
  deleteStudentCornerById,
} = require("../controllers/studentCornerController");

router.post("/create", createStudentCorner);
router.get("/all", getAllStudentCorner);
router.get("/:id", getStudentCornerById);
router.delete("/delete/:id", deleteStudentCornerById);

module.exports = router;
