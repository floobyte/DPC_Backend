const mongoose = require("mongoose");

const Department = new mongoose.Schema(
  {
    departmentName: {
      type: String,
      required: true,
    },
    hod: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      unique: false,
    },
    staffList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Department", Department);
