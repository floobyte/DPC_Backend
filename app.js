const express = require("express");

const app = express();

const cors = require("cors");
app.use(cors({ origin: "*" }));
app.use(cors());
require("dotenv/config");
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

const port = process.env.PORT;

const fileUpload = require("express-fileupload");
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use("/event", eventRouter);
app.use("/post", postRouter);
app.use("/course", courseRouter);
app.use("/notification", notificationRouter);
app.use("/user/auth", authRouter);
app.use("/admin", adminRouter, userRouter);
app.use("/staff", staffRouter);
app.use("/notice", noticeRouter);
app.use("/studentcorner", studentCornerRouter);
app.use("/downloaddata", downloadRouter);
app.use("/admission", admissionRouter);
app.use("/department", departmentRouter);
app.use("/blog", blogRouter);
app.use("/student", studentRouter);
app.use("/b-u/story", storyRouter);
app.use("/b-u/mentor", mentorRouter);

app.use(errorHandler);

connectDB();

// app.use(express.static(path.join(__dirname, "./client/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"), (err) => {
//     res.status(500).send(err);
//   });
// });
app.listen(port, () => {
  console.log(`connection is Live at port no. ${port}`);
});
