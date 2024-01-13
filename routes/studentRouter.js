const express = require("express");
const router = new express.Router();
const validateToken = require("../middleware/validateToken");
const {
  createStudent,
  getAllStudents,
  getStudentById,
  deleteStudentById,
} = require("../controllers/studentController");

router.post("/create", createStudent);
router.get("/all", getAllStudents);
router.get("/id/:id", getStudentById);
router.delete("/delete/:id", deleteStudentById);

module.exports = router;
