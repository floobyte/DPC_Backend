const mongoose = require("mongoose");

const Staff = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },

    bloodGroup: {
      type: String,
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    imageUrl: String,
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Staff", Staff);
