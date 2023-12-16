const StudentCorner = require("../models/studentCorner");
const asyncHandler = require("express-async-handler");

const createStudentCorner = asyncHandler(async (req, res) => {
  try {
    const studentCorner = req.body;
    const newStudentCorner = new StudentCorner({
      studentCorner,
    });

    const saved = await newStudentCorner.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const getAllStudentCorner = async (req, res) => {
  try {
    const result = await StudentCorner.find();
    if (result.length === 0) {
      res.status(404).json({ message: "No student corner available" });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getStudentCornerById = async (req, res) => {
  const { id } = req.params;

  try {
    const studentCorner = await StudentCorner.findById(id);

    if (!studentCorner) {
      return res.status(404).json({ message: "Student Corner not found" });
    }

    res.status(200).json(studentCorner);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteStudentCornerById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedStudent = await StudentCorner.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(deletedStudent);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createStudentCorner,
  getAllStudentCorner,
  getStudentCornerById,
  deleteStudentCornerById,
};
