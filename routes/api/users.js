const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const config = require("../../config/default.json");
const jwt = require("jsonwebtoken");
router.get("/", (req, res) => {
  User.find()
    .sort({ date: -1 })
    .then((users) => res.json(users));
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id).then((user) => res.json(user));
});

router.post("/", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (user) {
      res.status(400).json({ msg: "User already exists" });
    }
    const newUser = new User({
      name,
      email,
      password,
    });

    // USING BCRYPT
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
          throw err;
        }
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user._id },
            config.jwtSecret,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({ name: `${user.name} created`, token });
            }
          );
        });
      });
    });
  });
});

router.delete("/:id", (req, res) => {});
module.exports = router;
