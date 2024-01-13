const mongoose = require("mongoose");

const Student = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  achievement: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  course: String,
  percentage: String,
  image: String,
});

module.exports = mongoose.model("Student", Student);
