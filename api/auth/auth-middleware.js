const Users = require("../users/user-model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../../config/secrets.js");
const { token } = require("morgan");

async function checkNewUser(req, res, next) {
  const user = await Users.getByUsername(req.body.username);
  if (user) {
    res.json({ message: "username taken" });
  } else {
    next();
  }
}

function generateToken(user) {
  const payload = {
    subject: user.id, // sub in payload is what the token is about
    username: user.username,
    // ...otherData
  };

  const options = {
    expiresIn: "1d", // show other available options in the library's documentation
  };

  // extract the secret away so it can be required and used where needed
  return jwt.sign(payload, secrets.jwtSecret, options); // this method is synchronous
}

async function authenticateUser(req, res, next) {
  const user = await Users.getByUsername(req.body.username);
  const providedPassword = req.body.password;
  const hashedPasswordFromDb = user.password;

  if (bcrypt.compareSync(providedPassword, hashedPasswordFromDb)) {
    const token = generateToken(user);
    res.json({ message: `welcome, ${user.username}`, token: token });
  } else {
    res.json({ message: "invalid credentials" });
  }
}

async function validateCredentialsPresent(req, res, next) {}

module.exports = {
  checkNewUser,
  authenticateUser,
};
