const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const model = require("../model/user");
const User = model.user;
const fs = require("fs");
const path = require("path");
const { response } = require("..");
const privateKey = fs.readFileSync(
  path.resolve(__dirname, "../private.key"),
  "utf-8"
);

exports.signUp = async (req, res) => {
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
  try {
    const doc = await User.findOne({ email: req.body.email });
    const isAuth = await bcrypt.compare(req.body.password, doc.password);
    console.log(isAuth);
    if (isAuth) {
      var token = jwt.sign({ email: req.body.email }, privateKey, {
        algorithm: "RS256",
      });
      doc.token = token;
      doc.save();
      res.json({ token });
    } else res.sendStatus(401);
  } catch (error) {
    res.status(401).json(error);
  }
};
