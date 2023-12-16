const mongoose = require("mongoose");

const noticeBoard = new mongoose.Schema({
  notice: {
    type: String,
    required: true,
  },
  createdDateTime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Notice", noticeBoard);
