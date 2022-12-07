const jwt = require("jsonwebtoken");
const config = require("../configs/config");
module.exports.jwtDecoder = (token) => {
  return jwt.verify(token.split(" ")[1], config.jwt_secret_key);
};

module.exports.jwtEncoder = (id, email) => {
  return jwt.sign({ id, email }, config.jwt_secret_key, { expiresIn: "24h" });
}