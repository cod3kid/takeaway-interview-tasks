const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  console.log("mui", token);
  if (!token) {
    return res.send("No Token Found");
  }

  try {
    const decoded = jwt.verify(token, "dummyTokenSecret");
    req.user = decoded;
    next();
  } catch (err) {
    console.log(token);
    return res.send("Invalid Token");
  }
};

module.exports = auth;
