const Staff = require("../models/staff");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../configs/cloudinaryConfig");
const fs = require("fs");

const createStaff = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      fatherName,
      designation,
      category,
      dob,
      department,
      bloodGroup,
      appointmentDate,
      email,
      phone,
      address,
    } = req.body;

    const file = req.files.image;

    cloudinary.uploader.upload(file.tempFilePath, async (error, result) => {
      if (file.tempFilePath) {
        fs.unlinkSync(file.tempFilePath);
      }

      if (error) {
        return res.status(400).json({
          success: false,
          message: "Error uploading image to Cloudinary",
          error: error.message,
        });
      } else {
        const newStaff = new Staff({
          name,
          fatherName,
          designation,
          category,
          dob,
          department,
          bloodGroup,
          appointmentDate,
          email,
          phone,
          address,
          imageUrl: result.url,
        });

        const savedStaff = await newStaff.save();
        res.status(201).json({ success: true, data: savedStaff });
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating staff",
      error: error.message,
    });
  }
});

const getStaffById = async (req, res) => {
  try {
    const staffId = req.params.id;
    const existStaff = await Staff.findById(staffId);

    if (!existStaff) {
      return res.status(404).json({ error: "Staff not found" });
    }

    res.json(existStaff);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch the staff" });
  }
};

const getAllStaff = async (req, res) => {
  try {
    const staffList = await Staff.find({});
    if (staffList.length === 0) {
      res.status(204).json({ message: "No staffs available" });
    } else {
      res.status(200).json(staffList);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteStaffById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const staff = await Staff.findById(id);

    if (!staff) {
      return res
        .status(404)
        .json({ success: false, message: "Staff not found" });
    }

    await staff.remove();
    res
      .status(200)
      .json({ success: true, message: "Staff deleted successfully" });
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid ID format" });
    }

    res.status(500).json({
      success: false,
      message: "Error deleting staff",
      error: error.message,
    });
  }
});

module.exports = { createStaff, getStaffById, getAllStaff, deleteStaffById };
