const jwt = require("jsonwebtoken");

function jwtGenerator(username) {
  const payload = {
    username: username,
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "7d" });
}

module.exports = jwtGenerator;
