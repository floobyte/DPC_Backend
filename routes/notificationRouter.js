const express = require("express");
const validateToken = require("../middleware/validateToken");
const router = new express.Router();
const {
  createNotification,
  getAllNotifications,
  deleteNotificationById,
  updateNotificationById,
} = require("../controllers/notificationController");

router.post("/create", createNotification);
router.get("/all", getAllNotifications);
router.patch("/update/:id", validateToken, updateNotificationById);
router.delete("/delete/:id", deleteNotificationById);

module.exports = router;
