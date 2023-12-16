const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createDateTime: {
    type: Date,
    default: Date.now,
  },
  imageUrl: String,
});

module.exports = mongoose.model("EventData", eventSchema);
