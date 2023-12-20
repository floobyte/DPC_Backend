const DownloadData = require("../models/downloadData");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../configs/cloudinaryConfig");

const createDownload = asyncHandler(async (req, res) => {
  try {
    const { title } = req.body;
    const file = req.files.image;

    if (!file || file.mimetype !== "application/pdf") {
      return res.status(400).json({
        success: false,
        message: "Only PDF files are allowed",
      });
    }

    cloudinary.uploader.upload(file.tempFilePath, async (error, result) => {
      if (file.tempFilePath) {
        fs.unlinkSync(file.tempFilePath);
      }

      if (error) {
        res.status(400).json({
          success: false,
          message: "Error uploading image to Cloudinary",
          error: error.message,
        });
      } else {
        const newDownload = new DownloadData({
          title,
          url: result.url,
        });

        const savedDownload = await newDownload.save();
        res.status(201).json({ success: true, data: savedDownload });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating download data",
      error: error.message,
    });
  }
});

const getAllDownloadData = asyncHandler(async (req, res) => {
  try {
    const downloadData = await DownloadData.find();

    if (downloadData.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No download data found" });
    }

    res.status(200).json({ success: true, data: downloadData });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching download data",
      error: error.message,
    });
  }
});

const getDownloadDataById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const downloadData = await DownloadData.findById(id);

    if (!downloadData) {
      return res
        .status(404)
        .json({ success: false, message: "Download data not found" });
    }

    res.status(200).json({ success: true, data: downloadData });
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid ID format" });
    }

    res.status(500).json({
      success: false,
      message: "Error fetching download data",
      error: error.message,
    });
  }
});

const deleteDownloadData = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const downloadData = await DownloadData.findById(id);

    if (!downloadData) {
      return res
        .status(404)
        .json({ success: false, message: "Download data not found" });
    }

    await downloadData.remove();
    res
      .status(200)
      .json({ success: true, message: "Download data deleted successfully" });
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid ID format" });
    }

    res.status(500).json({
      success: false,
      message: "Error deleting download data",
      error: error.message,
    });
  }
});

module.exports = {
  createDownload,
  getAllDownloadData,
  getDownloadDataById,
  deleteDownloadData,
};
