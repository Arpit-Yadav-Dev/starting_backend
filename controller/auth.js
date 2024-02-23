const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  var token = jwt.sign({ email: req.body.email }, process.env.SECRET);
  user.token = token;
  try {
    const doc = await user.save();
    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};
