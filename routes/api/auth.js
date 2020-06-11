const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const config = require("../../config/default.json");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
//@route POST api/auth
//@desc LOGIN
//PUBLIC

router.post("/", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Fill all fields" });
  }
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(400).json({ msg: "User doesn't exists" });
    }
    // USING BCRYPT
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      jwt.sign(
        { id: user._id },
        config.jwtSecret,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ user: { id: user._id, name: user.name }, token });
        }
      );
    });
  });
});
//api/auth/
// @private

router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});
module.exports = router;
