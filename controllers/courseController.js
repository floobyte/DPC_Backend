const Course = require("../models/course");

const createCourse = async (req, res) => {
  try {
    const {
      name,
      description,
      fee,
      duration,
      enrollmentDateFrom,
      enrollmentDateTill,
    } = req.body;

    const newCourse = new Course({
      name,
      description,
      fee,
      duration,
      enrollmentDateFrom,
      enrollmentDateTill,
    });

    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const updatedCourseData = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    course.name = updatedCourseData.name || course.name;
    course.description = updatedCourseData.description || course.description;
    course.fee = updatedCourseData.fee || course.fee;
    course.duration = updatedCourseData.duration || course.duration;
    course.enrollmentDateFrom =
      updatedCourseData.enrollmentDateFrom || course.enrollmentDateFrom;
    course.enrollmentDateTill =
      updatedCourseData.enrollmentDateTill || course.enrollmentDateTill;

    const updatedCourse = await course.save();

    res.json(updatedCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find();

    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch courses" });
  }
};

const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch the course" });
  }
};

const deleteCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse)
      return res.status(404).json({ error: "Course not found" });
    res.json(deletedCourse);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  createCourse,
  updateCourseById,
  getAllCourse,
  getCourseById,
  deleteCourseById,
};
