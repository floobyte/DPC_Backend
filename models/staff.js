const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
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

// Middleware to handle removal of staff member
staffSchema.pre("remove", async function (next) {
  try {
    // Find departments where this staff is HOD
    const departments = await this.model("Department").find({ hod: this._id });

    // Update hod field to null in each department
    await Promise.all(
      departments.map(async (department) => {
        department.hod = null;
        await department.save();
      })
    );

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Staff", staffSchema);
