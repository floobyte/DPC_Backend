const eventData = require("../models/eventData");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../configs/cloudinaryConfig");
const fs = require("fs");

const createEvent = asyncHandler(async (req, res) => {
  try {
    const { title, description } = req.body;
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

const updateEventById = async (req, res) => {
  try {
    const _id = req.params.id;
    const updatedEventData = req.body;
    const event = await eventData.findById(_id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    event.title = updatedEventData.title || event.title;
    event.description = updatedEventData.description || event.description;

    // Update image only if provided in the request
    if (updatedEventData.imageUrl) {
      event.imageUrl = updatedEventData.imageUrl;
    }

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const resultEvents = await eventData.find({});
    res.json(resultEvents);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getEventById = async (req, res) => {
  try {
    const resultEvent = await eventData.findById(req.params.id);
    res.json(resultEvent);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteEvent = async (req, res) => {
  try {
    const _id = req.params.id;
    const deletedEvent = await eventData.findByIdAndDelete(_id);
    res.json(deletedEvent);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEventById,
  deleteEvent,
};
