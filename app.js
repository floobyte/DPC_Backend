const express = require("express");
const connectDB = require("./db/connectDB");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const errorHandler = require("./middleware/errorHandler");

const app = express();
require("dotenv/config");

const port = process.env.PORT || 3000;

const allowedOrigins = ["http://admin.dpccollege.com", "http://127.0.0.1:5500"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());
app.use("/uploads", express.static("uploads"));

const eventRouter = require("./routes/eventRouter");
const postRouter = require("./routes/postRouter");
const courseRouter = require("./routes/courseRouter");
const notificationRouter = require("./routes/notificationRouter");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");
const staffRouter = require("./routes/StaffRouter");
const noticeRouter = require("./routes/noticeBoardRouter");
const studentCornerRouter = require("./routes/studentCornerRouter");
const downloadRouter = require("./routes/downloadDataRouter");
const admissionRouter = require("./routes/admissionRouter");
const departmentRouter = require("./routes/departmentRouter");
const storyRouter = require("./routes/storyRouter");
const blogRouter = require("./routes/blogRouter");
const mentorRouter = require("./routes/mentorRouter");
const studentRouter = require("./routes/studentRouter");

app.use("/api/event", eventRouter);
app.use("/api/post", postRouter);
app.use("/api/course", courseRouter);
app.use("/api/notification", notificationRouter);
app.use("/api/user/auth", authRouter);
app.use("/api/admin", adminRouter, userRouter);
app.use("/api/staff", staffRouter);
app.use("/api/notice", noticeRouter);
app.use("/api/studentcorner", studentCornerRouter);
app.use("/api/downloaddata", downloadRouter);
app.use("/api/admission", admissionRouter);
app.use("/api/department", departmentRouter);
app.use("/api/blog", blogRouter);
app.use("/api/student", studentRouter);
app.use("/b-u/story", storyRouter);
app.use("/b-u/mentor", mentorRouter);

app.use(errorHandler);

app.listen(port, () => {
  connectDB();
  console.log(`Connection is Live at port no. ${port}`);
});
