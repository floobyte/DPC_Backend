const Staff = require("../models/staff");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../configs/cloudinaryConfig");

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
      if (error) {
        res.status(400).json({ error: error.message });
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
        res.status(201).json(savedStaff);
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
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

const deleteStaffById = async (req, res) => {
  const staffId = req.params.id;
  try {
    const staffToDelete = await Staff.findById(staffId);

    if (!staffToDelete) {
      return res.status(404).json({ message: "Staff not found" });
    }

    const deletedStaff = await Staff.findByIdAndDelete(staffId);

    res.status(200).json(deletedStaff);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createStaff, getStaffById, getAllStaff, deleteStaffById };
