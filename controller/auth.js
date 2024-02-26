const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const model = require("../model/user");
const User = model.user;
const fs = require("fs");
const path = require("path");
const privateKey = fs.readFileSync(
  path.resolve(__dirname, "../private.key"),
  "utf-8"
);

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  var token = jwt.sign({ email: req.body.email }, privateKey, {
    algorithm: "RS256",
  });

  const hash = bcrypt.hashSync(req.body.password, 10);
  user.token = token;
  user.password = hash;
  try {
    const doc = await user.save();
    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

exports.login = async (req, res) => {
    var token = jwt.sign({ email: req.body.email }, privateKey, {
      algorithm: "RS256",
    });
  
    const hash = bcrypt.hashSync(req.body.password, 10);
    user.token = token;
    user.password = hash;
    try {
      const doc = await user.save();
      res.status(201).json(doc);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  };