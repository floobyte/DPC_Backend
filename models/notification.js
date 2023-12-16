const mongoose = require("mongoose");

const Notification = new mongoose.Schema({
  news: {
    type: String,
    required: true,
  },
  newsUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Notification", Notification);
