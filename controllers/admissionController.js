const Admission = require("../models/admission");
const asyncHandler = require("express-async-handler");

const createAdmission = asyncHandler(async (req, res) => {
  try {
    const { name, email, phone, gender, dob, course } = req.body;

    if (!name || !email || !phone || !gender || !dob) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required information for admission.",
      });
    }

    const newAdmission = new Admission({
      name,
      email,
      phone,
      gender,
      dob,
      course,
    });

    const savedAdmission = await newAdmission.save();

    res.status(201).json({
      success: true,
      data: savedAdmission,
      message: "Admission created successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error creating admission.",
      error: error.message,
    });
  }
});

const getAllAdmission = async (req, res) => {
  try {
    const admissions = await Admission.find();

    if (admissions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No admission records found.",
      });
    }

    res.status(200).json({
      success: true,
      data: admissions,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error retrieving admission records.",
      error: error.message,
    });
  }
};

const getAdmissionById = async (req, res) => {
  try {
    const admissionId = req.params.id;

    if (!admissionId) {
      return res.status(400).json({
        success: false,
        message: "Admission ID is required.",
      });
    }

    const admission = await Admission.findById(admissionId);
    if (!admission) {
      return res.status(404).json({
        success: false,
        message: "Admission not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: admission,
    });
  } catch (error) {
    console.error(error);
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid Admission ID format.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Error retrieving admission record.",
      error: error.message,
    });
  }
};

const deleteAdmission = async (req, res) => {
  try {
    const admissionId = req.params.id;

    if (!admissionId) {
      return res.status(400).json({
        success: false,
        message: "Admission ID is required.",
      });
    }

    const deletedAdmission = await Admission.findByIdAndDelete(admissionId);

    if (!deletedAdmission) {
      return res.status(404).json({
        success: false,
        message: "Admission not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: deletedAdmission,
      message: "Admission deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid Admission ID format.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Error deleting admission record.",
      error: error.message,
    });
  }
};

module.exports = {
  createAdmission,
  getAllAdmission,
  getAdmissionById,
  deleteAdmission,
};
