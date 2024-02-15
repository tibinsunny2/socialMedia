const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// importing the middleware to the autherisation file
const { JWT_SCECRET } = require("../keys");
const wareLogin = require("../middleware/wareLogin");

// saving the data to the database
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res
      .status(422)
      .json({ error: "please add all the details and all the fields" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (savedUser) {
      return res
        .status(422)
        .json({ error: "the user with the same email is exist" });
    } else {
      bcrypt
        .hash(password, 12)
        // 12 is the minimum require of the number of characters more than this will be a stronger password
        .then((hashedpassword) => {
          const user = new User({
            email,
            password: hashedpassword,
            name,
          });
          user
            .save()
            .then((user) => {
              res.json({ message: "saved successfully" });
            })
            .catch((err) => {
              console.log(err);
            });
        });
    }
  });
});

// sign in or login router

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({
      message: "invalid email or password",
    });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({
        message: "invalid email or password",
      });
    }
    bcrypt.compare(password, savedUser.password).then((doMatch) => {
      if (doMatch) {
        // res.json({ message: "successfully logged in" });
        const token = jwt.sign({
            id: savedUser._id,
          },
          JWT_SCECRET
        );
        const { email, name, _id } = savedUser;
        res.json({ token, user: { email, name, _id } });
      } else {
        return res.status(422).json({
          message: "invalid email or passwords",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  });
});

module.exports = router;
