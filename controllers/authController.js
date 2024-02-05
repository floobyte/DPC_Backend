const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "mail.floobyte.com",
  port: 465,
  auth: {
    user: "admin@dpccollege.com",
    pass: "anita@dpc",
  },
});

function sendConfirmationEmailToAdmin(name, email) {
  const mailOptions = {
    from: "admin@dpccollege.com",
    to: "admindpc@dpccollege.com",
    subject: "New User Registration Approval",
    html: `
      <p>Hello Admin,</p>
      <p>A new user with the following details has registered:</p>
      <ul>
        <li>Name: ${name}</li>
        <li>Email: ${email}</li>
      </ul>
      <p>Please click the following link to approve the registration:</p>
      <a
        href="https://dpccollege.com/approval.html?email=${email}"
        style="background-color: green; color: white; padding: 10px 15px; text-decoration: none; display: inline-block; cursor: pointer;"
      >
        Approve Registration
      </a>


    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      status: "Pending",
    });

    const savedUser = await newUser.save();

    sendConfirmationEmailToAdmin(name, email);

    res.status(201).json({
      savedUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Cannot register user. Please try again." });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid email or password2" });
    }
    if (user.status !== "Approved")
      return res
        .status(400)
        .json({ message: "Your account haven't been appproved by the admin" });

    const token = generateToken(email);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

const generateToken = (email) => {
  const payload = { email };
  const secretKey = process.env.JWT_SECRET;
  const options = {
    expiresIn: "12h",
  };

  return jwt.sign(payload, secretKey, options);
};

module.exports = { registerUser, loginUser };
