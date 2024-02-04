const express = require("express");
const router = new express.Router();
const validateToken = require("../middleware/validateToken");
const eventData = require("../models/eventData");

router.post("/create", async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;

    const newEvent = new eventData({
      title,
      description,
      imageUrl,
    });

    const savedEvent = await newEvent.save();
    res.status(201).json({ success: true, data: savedEvent });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating event",
      error: error.message,
    });
  }
});
router.get("/allevents", async (req, res) => {
  try {
    const resultEvents = await eventData.find({});
    res.json(resultEvents);
  } catch (error) {
    res.status(400).json(error);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const resultEvent = await eventData.findById(req.params.id);
    res.json(resultEvent);
  } catch (error) {
    res.status(400).json(error);
  }
});
// router.put("/update/:id", validateToken, updateEventById);

router.delete("/delete/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const deletedEvent = await eventData.findByIdAndDelete(_id);
    res.json(deletedEvent);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
