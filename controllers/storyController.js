const Story = require("../models/story");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../configs/cloudinaryConfig");
const fs = require("fs");

const createStory = asyncHandler(async (req, res) => {
  try {
    const { title, description } = req.body;
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
        const newStory = new Story({
          title,
          description,
          image: result.url,
        });

        const savedStory = await newStory.save();
        res.status(201).json({ success: true, data: savedStory });
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating story",
      error: error.message,
    });
  }
});

const getAllStory = async (req, res) => {
  try {
    const stories = await Story.find();

    if (stories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No stories found in the database",
      });
    }

    res.status(200).json({ success: true, data: stories });
  } catch (error) {
    console.error("Error fetching stories:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getStoryById = async (req, res) => {
  try {
    const storyId = req.params.id;

    const story = await Story.findById(storyId);

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    res.status(200).json({ success: true, data: story });
  } catch (error) {
    console.error("Error fetching story by ID:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid story ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const deleteStoryById = async (req, res) => {
  try {
    const storyId = req.params.id;

    const deletedStory = await Story.findByIdAndDelete(storyId);

    if (!deletedStory) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Story deleted successfully",
      data: deletedStory,
    });
  } catch (error) {
    console.error("Error deleting story by ID:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid story ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const updateStory = async (req, res) => {
  try {
    const storyId = req.params.id;
    const { title, description } = req.body;

    const updatedStory = await Story.findByIdAndUpdate(
      storyId,
      { title, description },
      { new: true, runValidators: true }
    );

    if (!updatedStory) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Story updated successfully",
      data: updatedStory,
    });
  } catch (error) {
    console.error("Error updating story by ID:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid story ID format",
      });
    }

    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (val) => val.message
      );
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validationErrors,
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
  createStory,
  getAllStory,
  getStoryById,
  deleteStoryById,
  updateStory,
};
