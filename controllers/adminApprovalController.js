const User = require("../models/userModel");

const approveUser = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await User.findOneAndUpdate(
      { email: email },
      { status: "Approved" }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User approved successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to approve user." });
  }
};

const disapproveUser = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await User.findOneAndDelete({ email: email });

    res.json({ message: "User disapproved" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to disapprove user." });
  }
};

module.exports = {
  approveUser,
  disapproveUser,
};
