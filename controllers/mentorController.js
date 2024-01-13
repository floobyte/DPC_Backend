const Mentor = require("../models/mentor");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../configs/cloudinaryConfig");
const fs = require("fs");

const createMentor = asyncHandler(async (req, res) => {
  try {
    const { name, description } = req.body;
    const file = req.files.image;

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
        const newMentor = new Mentor({
          name,
          description,
          image: result.url,
        });

        const savedMentor = await newMentor.save();
        res.status(201).json({ success: true, data: savedMentor });
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating mentor",
      error: error.message,
    });
  }
});

const getAllMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find();

    if (!mentors || mentors.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No mentors found",
      });
    }

    res.status(200).json({ success: true, data: mentors });
  } catch (error) {
    console.error("Error fetching mentors:", error);

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

const getMentorById = async (req, res) => {
  try {
    const mentorId = req.params.id;

    const mentor = await Mentor.findById(mentorId);

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: "Mentor not found",
      });
    }

    res.status(200).json({ success: true, data: mentor });
  } catch (error) {
    console.error("Error fetching mentor by ID:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid mentor ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const deleteMentorById = async (req, res) => {
  try {
    const mentorId = req.params.id;

    const deletedMentor = await Mentor.findByIdAndDelete(mentorId);

    if (!deletedMentor) {
      return res.status(404).json({
        success: false,
        message: "Mentor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Mentor deleted successfully",
      data: deletedMentor,
    });
  } catch (error) {
    console.error("Error deleting mentor by ID:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid mentor ID format",
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
  createMentor,
  getAllMentors,
  getMentorById,
  deleteMentorById,
};
