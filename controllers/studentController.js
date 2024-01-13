const Student = require("../models/student");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../configs/cloudinaryConfig");
const fs = require("fs");

const createStudent = asyncHandler(async (req, res) => {
  try {
    const { name, achievement, email, phone, gender, dob, course, percentage } =
      req.body;

    const file = req.files ? req.files.image : null;

    let imageUrl = "";

    if (file) {
      cloudinary.uploader.upload(file.tempFilePath, async (error, result) => {
        if (file.tempFilePath) {
          fs.unlinkSync(file.tempFilePath);
        }

        if (error) {
          res.status(400).json({
            success: false,
            message: "Error uploading image to Cloudinary",
            error: error.message,
          });
        } else {
          imageUrl = result.url;

          const newStudent = new Student({
            name,
            achievement,
            email,
            phone,
            gender,
            dob,
            course,
            percentage,
            image: imageUrl,
          });

          const savedStudent = await newStudent.save();
          res.status(201).json({ success: true, data: savedStudent });
        }
      });
    } else {
      const newStudent = new Student({
        name,
        achievement,
        email,
        phone,
        gender,
        dob,
        course,
        percentage,
      });

      const savedStudent = await newStudent.save();
      res.status(201).json({ success: true, data: savedStudent });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating student",
      error: error.message,
    });
  }
});

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();

    if (!students || students.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No students found",
      });
    }

    res.status(200).json({ success: true, data: students });
  } catch (error) {
    console.error("Error fetching students:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid data format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    console.error("Error fetching student by ID:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const deleteStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;

    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      data: deletedStudent,
    });
  } catch (error) {
    console.error("Error deleting student by ID:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  deleteStudentById,
};
