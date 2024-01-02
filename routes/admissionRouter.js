const express = require("express");
const router = new express.Router();
const validateToken = require("../middleware/validateToken");

const {
  createAdmission,
  getAllAdmission,
  getAdmissionById,
  deleteAdmission,
  acceptAdmission,
} = require("../controllers/admissionController");

router.post("/create", createAdmission);
router.get("/id/:id", getAdmissionById);
router.get("/all", getAllAdmission);
router.delete("/delete/:id", deleteAdmission);
router.patch("/accept/:id", acceptAdmission);

module.exports = router;
