const Notification = require("../models/notification");

const createNotification = async (req, res) => {
  try {
    const { news, newsUrl } = req.body;

    const newNotification = new Notification({
      news,
      newsUrl,
    });

    const savedNotification = await newNotification.save();

    res.status(201).json(savedNotification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    if (notifications.length === 0) {
      res.status(404).json({ message: "No notifications available" });
    } else {
      res.status(200).json(notifications);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteNotificationById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNotification = await Notification.findByIdAndDelete(id);

    if (!deletedNotification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.status(200).json(deletedNotification);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getStudentCornerById = async (req, res) => {
  const { id } = req.params;

  try {
    const notificationRes = await Notification.findById(id);

    if (!notificationRes) {
      return res.status(404).json({ message: "Student Corner not found" });
    }

    res.status(200).json(notificationRes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateNotificationById = async (req, res) => {
  const { id } = req.params;
  const { notice } = req.body;

  try {
    const updatedNotification = await Notification.findByIdAndUpdate(
      id,
      { notice },
      { new: true }
    );

    if (!updatedNotification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.status(200).json(updatedNotification);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createNotification,
  getAllNotifications,
  deleteNotificationById,
  updateNotificationById,
};
