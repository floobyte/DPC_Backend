const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const findUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const findUserByEmailId = async (req, res) => {
  try {
    const userEmail = req.params.emailId;
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete(req.params.id);
    res.json(deletedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.body.name) {
      existingUser.name = req.body.name;
    }
    if (req.body.email) {
      existingUser.email = req.body.email;
    }

    if (req.body.password) {
      const newPassword = req.body.password;
      const hashPassword = await bcrypt.hash(newPassword, 10);
      existingUser.password = hashPassword;
    }

    const updatedUser = await existingUser.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
  }
};

module.exports = {
  getAllUsers,
  findUserById,
  deleteUserById,
  updateUser,
  findUserByEmailId,
};
