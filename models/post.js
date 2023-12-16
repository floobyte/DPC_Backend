const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
  },
  createDateTime: {
    type: Date,
    default: Date.now,
  },
  imageUrl: String,
});

module.exports = mongoose.model("Post", postSchema);
