const NoticeBoard = require("../models/noticeBoard");
const asyncHandler = require("express-async-handler");
const schedule = require("node-schedule");

const createNotice = asyncHandler(async (req, res) => {
  try {
    const noticeData = req.body;

    const newNotice = new NoticeBoard({
      notice: noticeData.notice,
    });

    const savedNotice = await newNotice.save();

    const deletionDate = new Date();
    deletionDate.setHours(deletionDate.getHours() + 36);

    schedule.scheduleJob(deletionDate, async () => {
      await NoticeBoard.findByIdAndDelete(savedNotice._id);
      console.log(`Notice with ID ${savedNotice._id} deleted after 36 hours.`);
    });

    res.status(201).json(savedNotice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const getAllNotices = async (req, res) => {
  try {
    const notices = await NoticeBoard.find();

    if (notices.length === 0) {
      res.status(404).json({ message: "No notices available" });
    } else {
      res.status(200).json(notices);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteNoticeById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedNotice = await NoticeBoard.findByIdAndDelete(id);

    if (!deletedNotice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    res.status(200).json(deletedNotice);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createNotice, getAllNotices, deleteNoticeById };
