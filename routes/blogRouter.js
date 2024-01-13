const express = require("express");
const router = new express.Router();
const validateToken = require("../middleware/validateToken");
const {
  createBlog,
  getAllBlog,
  getBlogByCategory,
  getBlogById,
  deleteBlogById,
  updateBlogById,
} = require("../controllers/blogController");

router.post("/create", createBlog);
router.get("/all", getAllBlog);
router.get("/category/:category", getBlogByCategory);
router.get("/id/:id", getBlogById);
router.delete("/delete/:id", deleteBlogById);
router.patch("/update/:id", updateBlogById);

module.exports = router;
