const mongoose = require("mongoose");

const StudentCorner = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  url: String,
});
