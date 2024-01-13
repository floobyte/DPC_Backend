const mongoose = require("mongoose");

const Mentor = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: String,
});

module.exports = mongoose.model("Mentor", Mentor);
