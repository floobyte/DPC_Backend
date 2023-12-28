const express = require("express");
const router = new express.Router();
const validateToken = require("../middleware/validateToken");

const {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  deleteDepartmentById,
  updateDepartmentById,
} = require("../controllers/departmentController");

router.post("/create", createDepartment);
router.get("/all", getAllDepartments);
router.get("/id/:id", getDepartmentById);
router.delete("/delete/:id", deleteDepartmentById);
router.put("/update/:id", updateDepartmentById);

module.exports = router;
