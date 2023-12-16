const express = require("express");
const router = new express.Router();
const validateToken = require("../middleware/validateToken");
const {
  createNotice,
  getAllNotices,
  deleteNoticeById,
} = require("../controllers/noticeBoardController");

router.post("/create", createNotice);
router.get("/all", getAllNotices);
router.delete("/delete/:id", deleteNoticeById);

module.exports = router;
