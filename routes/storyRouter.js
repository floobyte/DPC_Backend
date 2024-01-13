const express = require("express");
const router = new express.Router();
const validateToken = require("../middleware/validateToken");

const {
  createStory,
  getAllStory,
  getStoryById,
  deleteStoryById,
  updateStory,
} = require("../controllers/storyController");

router.post("/create", createStory);
router.get("/all", getAllStory);
router.get("/id/:id", getStoryById);
router.delete("/delete/:id", deleteStoryById);
router.patch("/update/:id", updateStory);

module.exports = router;
