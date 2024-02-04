const express = require("express");
const router = new express.Router();
const validateToken = require("../middleware/validateToken");
const Post = require("../models/post");

const fs = require("fs");

router.post("/create", async (req, res) => {
  try {
    const { caption, imageUrl } = req.body;

    const newPost = new Post({
      caption,
      imageUrl,
    });

    const savedPost = await newPost.save();
    res.status(201).json({ success: true, data: savedPost });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating post",
      error: error.message,
    });
  }
});

router.get("/allposts", async (req, res) => {
  try {
    const resultPosts = await Post.find({});

    res.json(resultPosts);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const resultPost = await Post.findById(req.params.id);
    res.json(resultPost);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const deletedPost = await Post.findByIdAndDelete(_id);
    res.json(deletedPost);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
