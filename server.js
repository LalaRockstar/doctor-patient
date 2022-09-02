const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const viewRouter = require("./routers/viewRouter");
const userRouter = require("./routers/userRouter");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "assets")));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
//___________Router

app.use("/", viewRouter);
app.use("/api/v1/booking", userRouter);
//___________Server
dotenv.config({ path: "./config.env" });
// const db = process.env.DATABASE_LOCAL;
const DATABASE =
  "mongodb+srv://lalarockstar1994:<password>@cluster0.hrcbcn3.mongodb.net/booking?retryWrites=true&w=majority";
const db = DATABASE.replace(
  "<password>",
  // eslint-disable-next-line comma-dangle
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(db)
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err.message));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
