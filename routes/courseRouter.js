const express = require("express");
const router = new express.Router();
const validateToken = require("../middleware/validateToken");

const {
  createCourse,
  updateCourseById,
  getAllCourse,
  getCourseById,
  deleteCourseById,
} = require("../controllers/courseController");

router.post("/create", validateToken, createCourse);
router.get("/all", getAllCourse);
router.get("/:id", getCourseById);
router.put("/update/:id", validateToken, updateCourseById);
router.delete("/delete/:id", validateToken, deleteCourseById);

module.exports = router;
