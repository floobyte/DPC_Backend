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

router.post("/create", createCourse);
router.get("/all", getAllCourse);
router.get("/:id", getCourseById);
router.put("/update/:id", updateCourseById);
router.delete("/delete/:id", deleteCourseById);

module.exports = router;
