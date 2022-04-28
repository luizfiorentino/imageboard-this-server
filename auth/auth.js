// require the module
const jwt = require("jsonwebtoken");

// define a secret key for JWT
const secret =
  process.env.JWT_SECRET || "%6^#$$$lkkkDDDMm2@-+::hjhjhjshsDSUA7*@";

// create a JWT token
function toJWT(data) {
  return jwt.sign(data, secret, { expiresIn: "2h" });
}

// verifies tokens validity
function toData(token) {
  return jwt.verify(token, secret);
}

module.exports = { toJWT, toData };
