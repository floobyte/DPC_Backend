const express = require("express");
const router = new express.Router();
const validateToken = require("../middleware/validateToken");

const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEventById,
  deleteEvent,
} = require("../controllers/eventController");

router.post("/create", createEvent);
router.get("/all", getAllEvents);
router.get("/:id", getEventById);
router.put("/update/:id", validateToken, updateEventById);
router.delete("/delete/:id", validateToken, deleteEvent);

module.exports = router;
