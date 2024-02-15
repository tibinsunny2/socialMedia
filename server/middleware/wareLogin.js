const jwt = require("jsonwebtoken");
const express = require("express");
const { JWT_SCECRET } = require("../keys");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // authorization = bearer thazhathupoikayilt12345
  console.log(authorization);
  if (!authorization) {
    res.status(401).json({ error: "you must loggedin" });
  }
  const token = authorization.replace("Bearer ","");
  jwt.verify(token, JWT_SCECRET, (err, payload) => {
    if (err) {
      res.status(401).json({ error: "you must be logged in" });
    }
    const { _id } = payload;
    User.findById(_id).then((userdata) => {
      req.user = userdata;
      console.log(req.user);
      next();
    });
  });
};
