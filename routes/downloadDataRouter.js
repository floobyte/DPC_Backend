const express = require("express");
const router = express.Router();
const {
  createDownload,
  getAllDownloadData,
  getDownloadDataById,
  deleteDownloadData,
} = require("../controllers/downloadController");

// Add validation middleware if needed
// const validateToken = require("../middleware/validateToken");

router.post("/create", createDownload);
router.get("/id/:id", getDownloadDataById);
router.get("/all", getAllDownloadData);
router.delete("/delete/:id", deleteDownloadData);

module.exports = router;
