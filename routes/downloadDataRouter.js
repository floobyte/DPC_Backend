const express = require("express");
const router = new express.Router();
const validateToken = require("../middleware/validateToken");
const {
  createDownload,
  getAllDownloadData,
  getDownloadDataById,
  deleteDownloadData,
} = require("../controllers/downloadController");

router.post("/create", validateToken, createDownload);
router.get("/id/:id", getDownloadDataById);
router.get("/all", getAllDownloadData);
router.delete("/delete/:id", deleteDownloadData);

module.exports = router;
