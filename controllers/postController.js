const Post = require("../models/post");
const fs = require("fs").promises;

const createPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const imageUrl = req.file ? req.file.path : undefined;

    const newPost = new Post({
      caption,
      imageUrl,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const resultPosts = await Post.find({});

    if (resultPosts.length === 0) {
      return res.status(404).json({ message: "No posts found." });
    }

    res.json(resultPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ error: "Invalid post ID." });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updatePostById = async (req, res) => {};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ error: "Invalid post ID." });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    if (post.imageUrl) {
      const imagePath = path.join(__dirname, "..", "uploads", post.imageUrl);

      const fileExists = await fs
        .access(imagePath)
        .then(() => true)
        .catch(() => false);

      if (fileExists) {
        await fs.unlink(imagePath);
      }
    }

    await Post.findByIdAndDelete(postId);

    res.json({ message: "Post deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePost,
};
