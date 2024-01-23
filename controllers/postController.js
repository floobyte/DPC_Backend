const Post = require("../models/post");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../configs/cloudinaryConfig");
const fs = require("fs");

const createPost = asyncHandler(async (req, res) => {
  try {
    const { caption } = req.body;
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
        const newPost = new Post({
          caption,
          imageUrl: result.url,
        });

        const savedPost = await newPost.save();
        res.status(201).json({ success: true, data: savedPost });
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating post",
      error: error.message,
    });
  }
});

const getAllPosts = async (req, res) => {
  try {
    const resultPosts = await Post.find({});

    res.json(resultPosts);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getPostById = async (req, res) => {
  try {
    const resultPost = await Post.findById(req.params.id);
    res.json(resultPost);
  } catch (error) {
    res.status(400).json(error);
  }
};

const updatePostById = async (req, res) => {
  try {
    const _id = req.params.id;
    const updatedPostData = req.body;
    const post = await Post.findById(_id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    post.caption = updatedPostData.caption || post.caption;
    post.imageUrl = updatedPostData.imageUrl || post.imageUrl;
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const _id = req.params.id;
    const deletedPost = await Post.findByIdAndDelete(_id);
    res.json(deletedPost);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePost,
};
