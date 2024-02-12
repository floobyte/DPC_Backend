const Department = require("../models/department");
const Staff = require("../models/staff");
const asyncHandler = require("express-async-handler");

const createDepartment = asyncHandler(async (req, res) => {
  try {
    const { departmentName, hod, staffList } = req.body;

    let hodExists = null;

    if (hod) {
      hodExists = await Staff.findById(hod);
      if (!hodExists) {
        return res.status(400).json({
          success: false,
          message: "Head of Department not found",
        });
      }
    }

    const updatedStaffList = hodExists ? [...staffList, hod] : staffList;

    const newDepartment = new Department({
      departmentName,
      hod: hodExists ? hod : null,
      staffList: updatedStaffList,
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
    const departments = await Department.find().populate("hod").exec();

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
    const exist = await Department.findById(depId)
      .populate("hod")
      .populate("staffList")
      .exec();

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

const addHodToDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { departmentName } = req.body;

    if (!departmentName || !id) {
      return res
        .status(400)
        .json({ error: "Department name and HOD ID are required" });
    }

    const department = await Department.findOne({ departmentName });

    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    if (department.hod && department.hod.toString() === id) {
      return res
        .status(400)
        .json({ error: "The HOD is already assigned to this department" });
    }

    const existingHod = await Department.findOne({ hod: id });
    if (
      existingHod &&
      existingHod._id.toString() !== department._id.toString()
    ) {
      return res
        .status(400)
        .json({ error: "The HOD is already assigned to another department" });
    }

    department.hod = id;

    await department.save();

    return res.json({
      success: true,
      message: "HOD added to department successfully",
    });
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return res.status(500).json({ error: "Failed to add HOD to department" });
  }
};

const addMembersToDepartment = async (req, res) => {
  try {
    const { departmentId } = req.params;
    const { memberId } = req.body;

    if (!departmentId || !memberId) {
      return res
        .status(400)
        .json({ error: "Department ID and member ID are required" });
    }

    const department = await Department.findById(departmentId);

    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    if (department.staffList.includes(memberId)) {
      return res
        .status(400)
        .json({ error: "Member is already in the department" });
    }

    department.staffList.push(memberId);

    await department.save();

    return res.json({
      success: true,
      message: "Member added to department successfully",
    });
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return res
      .status(500)
      .json({ error: "Failed to add member to department" });
  }
};

module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  deleteDepartmentById,
  updateDepartmentById,
  addHodToDepartment,
  addMembersToDepartment,
};
