const mongoose = require("mongoose");

const Blog = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imageUrl: String,
  url: String,
});

module.exports = mongoose.model("Blog", Blog);
