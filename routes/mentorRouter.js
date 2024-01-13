const express = require("express");
const router = new express.Router();
const validateToken = require("../middleware/validateToken");
const {
  createMentor,
  getAllMentors,
  getMentorById,
  deleteMentorById,
} = require("../controllers/mentorController");

router.post("/create", createMentor);
router.get("/all", getAllMentors);
router.get("/id/:id", getMentorById);
router.delete("/delete/:id", deleteMentorById);

module.exports = router;
