const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("./user");
const auth = require("./auth");

const router = express.Router();

router.post("/register", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  const result = await user.save();
  res.send(result);
});

router.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.send("Invalid User or Password");
  }
  const validatePassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!validatePassword) {
    return res.send("Invalid User or Password");
  }

  const token = jwt.sign({ _id: user._id }, "dummyTokenSecret");
  return res
    .header("x-auth-token", token)
    .send({ message: "Login Succesful", user, token });
});

module.exports = router;
