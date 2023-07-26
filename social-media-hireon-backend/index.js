const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./authRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);

mongoose
  .connect("mongodb://localhost/User", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.log("Could not connect to mongodb", err);
  });

app.listen(4000, () => {
  console.log("Server Running On Port 4000");
});
