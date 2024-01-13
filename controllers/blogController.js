const Blog = require("../models/blog");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../configs/cloudinaryConfig");
const fs = require("fs");

const createBlog = asyncHandler(async (req, res) => {
  try {
    const { title, content, category, url } = req.body;
    let imageUrl = "";

    if (req.files && req.files.image) {
      const file = req.files.image;

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file.tempFilePath, (error, result) => {
          if (file.tempFilePath) {
            fs.unlinkSync(file.tempFilePath);
          }

          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });

      imageUrl = result.url;
    }

    const newBlog = new Blog({
      title,
      content,
      category,
      imageUrl,
      url,
    });

    const savedBlog = await newBlog.save();
    res.status(201).json({ success: true, data: savedBlog });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating blog",
      error: error.message,
    });
  }
});
const getAllBlog = async (req, res) => {
  try {
    const blogs = await Blog.find();

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No blogs found",
      });
    }

    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);

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
const getBlogByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    const blogs = await Blog.find({ category });

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No blogs found for category: ${category}`,
      });
    }

    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    console.error("Error fetching blogs by category:", error);

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

const getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    console.error("Error fetching blog by ID:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const deleteBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;

    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
      data: deletedBlog,
    });
  } catch (error) {
    console.error("Error deleting blog by ID:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
const updateBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;
    const { title, content } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    console.error("Error updating blog by ID:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID format",
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
  createBlog,
  getAllBlog,
  getBlogByCategory,
  getBlogById,
  deleteBlogById,
  updateBlogById,
};
