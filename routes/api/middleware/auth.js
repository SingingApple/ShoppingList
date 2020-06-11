const config = require("../../../config/default.json");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  //check for token

  if (!token) {
    return res.status(401).json({ msg: "No token authorization" });
  }
  //verify token
  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    //Add user from payload

    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token invalid" });
  }
};
module.exports = auth;
