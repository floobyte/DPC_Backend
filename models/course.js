const mongoose = require("mongoose");

const Course = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fee: Number,
  duration: String,
  enrollmentDateFrom: Date,
  enrollmentDateTill: Date,
});

module.exports = mongoose.model("Course", Course);
