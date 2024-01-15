const express = require("express");
const router = new express.Router();
const validateToken = require("../middleware/validateToken");
const upload = require("../utils/multerConfig");

const {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePost,
} = require("../controllers/postController");

router.post("/create", upload.single("image"), createPost);
router.get("/all", getAllPosts);
router.get("/:id", getPostById);
router.put("/update/:id", validateToken, updatePostById);
router.delete("/delete/:id", validateToken, deletePost);

module.exports = router;
