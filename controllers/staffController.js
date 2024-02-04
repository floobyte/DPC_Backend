const Staff = require("../models/staff");
const Department = require("../models/department");
const asyncHandler = require("express-async-handler");

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
      imageUrl,
    } = req.body;

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
      imageUrl,
    });

    const savedStaff = await newStaff.save();

    await Department.findByIdAndUpdate(
      department,
      { $push: { staffList: savedStaff._id } },
      { new: true }
    );

    res.status(201).json({ success: true, data: savedStaff });
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
    const existStaff = await Staff.findById(staffId)
      .populate("department")
      .exec();

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
    const staffList = await Staff.find({}).populate("department").exec();
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
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Staff ID is required.",
      });
    }

    const deletedAdmission = await Staff.findByIdAndDelete(id);

    if (!deletedAdmission) {
      return res.status(404).json({
        success: false,
        message: "Staff not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: deletedAdmission,
      message: "Staff deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid Staff ID format.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Error deleting admission record.",
      error: error.message,
    });
  }
};

module.exports = { createStaff, getStaffById, getAllStaff, deleteStaffById };
