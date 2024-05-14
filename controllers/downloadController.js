const DownloadData = require("../models/downloadData");
const asyncHandler = require("express-async-handler");

const createDownload = asyncHandler(async (req, res) => {
  const { title, url } = req.body;

  if (!title || !url) {
    return res.status(400).json({
      success: false,
      message: "Title and URL are required",
    });
  }

  const newDownload = new DownloadData({
    title,
    url,
  });

  const savedDownload = await newDownload.save();
  res.status(201).json({ success: true, data: savedDownload });
});

const getAllDownloadData = asyncHandler(async (req, res) => {
  const downloadData = await DownloadData.find();

  if (downloadData.length === 0) {
    return res.status(404).json({ success: false, message: "No download data found" });
  }

  res.status(200).json({ success: true, data: downloadData });
});

const getDownloadDataById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ success: false, message: "ID is required" });
  }

  const downloadData = await DownloadData.findById(id);

  if (!downloadData) {
    return res.status(404).json({ success: false, message: "Download data not found" });
  }

  res.status(200).json({ success: true, data: downloadData });
});

const deleteDownloadData = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ success: false, message: "ID is required" });
  }

  const downloadData = await DownloadData.findById(id);

  if (!downloadData) {
    return res.status(404).json({ success: false, message: "Download data not found" });
  }

  await downloadData.remove();
  res.status(200).json({ success: true, message: "Download data deleted successfully" });
});

module.exports = {
  createDownload,
  getAllDownloadData,
  getDownloadDataById,
  deleteDownloadData,
};
