const Department = require("../models/department");
const Staff = require("../models/staff");
const asyncHandler = require("express-async-handler");

const createDepartment = asyncHandler(async (req, res) => {
  try {
    const { departmentName, hod, staffList } = req.body;

    let hodExists = true;

    if (hod) {
      hodExists = await Staff.findById(hod);
      if (!hodExists) {
        return res.status(400).json({
          success: false,
          message: "Head of Department not found",
        });
      }
    }

    const newDepartment = new Department({
      departmentName,
      hod: hodExists ? hod : null,
      staffList,
    });

    const savedDepartment = await newDepartment.save();
    res.status(201).json({ success: true, data: savedDepartment });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating department",
      error: error.message,
    });
  }
});

const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();

    if (departments.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No departments found" });
    }
    res.status(200).json({ success: true, data: departments });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching departments",
      error: error.message,
    });
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const depId = req.params.id;
    const exist = await Department.findById(depId);

    if (!exist) {
      return res.status(404).json({ error: "Department not found" });
    }

    res.json(exist);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch the department" });
  }
};

const deleteDepartmentById = async (req, res) => {
  try {
    const departmentId = req.params.id;

    const existingDepartment = await Department.findById(departmentId);

    if (!existingDepartment) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    await Department.findByIdAndDelete(departmentId);

    res.status(200).json({
      success: true,
      message: "Department deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting department:", error);

    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid department ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateDepartmentById = async (req, res) => {
  try {
    const departmentId = req.params.id;
    const updateData = req.body;

    const existingDepartment = await Department.findById(departmentId);

    if (!existingDepartment) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    const updatedDepartment = await Department.findByIdAndUpdate(
      departmentId,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedDepartment,
      message: "Department updated successfully",
    });
  } catch (error) {
    console.error("Error updating department:", error);

    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid department ID",
      });
    } else if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  deleteDepartmentById,
  updateDepartmentById,
};
