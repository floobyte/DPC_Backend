const mongoose = require("mongoose");

const DownloadData = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: String,
});

module.exports = mongoose.model("DownloadData", DownloadData);
