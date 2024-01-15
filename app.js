const express = require("express");
const connectDB = require("./db/connectDB");
const eventRouter = require("./routes/eventRouter");
const postRouter = require("./routes/postRouter");
const courseRouter = require("./routes/courseRouter");
const notificationRouter = require("./routes/notificationRouter");
const authRouter = require("./routes/authRouter");
const errorHandler = require("./middleware/errorHandler");
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

const app = express();
require("dotenv/config");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

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
  console.log(`connection is Live at port no. ${port}`);
});
