const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../../config/secrets");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(req.headers, "headers");
  console.log(token, "token");
  if (!token) {
    console.log("hello from restrict");
    res.status(401).json({ message: "token required" });
  }
  next();
  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
};
