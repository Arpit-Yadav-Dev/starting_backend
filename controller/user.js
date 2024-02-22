const fs = require("fs");
const model = require("../model/user");
const mongoose = require("mongoose");
const User = model.user;
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  var token = jwt.sign({ email: req.body.email }, "shhhhh");
  user.token = token
  try {
    const doc = await user.save();
    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

exports.getAllUsers = (req, res) => {
  res.json(users);
};

exports.getUser = (req, res) => {
  console.log(+req.params.id);
  const id = +req.params.id;
  const user = users.find((prd) => prd.id === id);

  res.json(user);
};

exports.replaceUser = (req, res) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((prd) => prd.id === id);
  users.splice(userIndex, 1, { ...req.body, id: id });
  res.status(201).json();
};

exports.updateUser = (req, res) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((prd) => prd.id === id);
  const user = users[userIndex];
  users.splice(userIndex, 1, { ...user, ...req.body });
  res.status(201).json();
};

exports.deleteUser = (req, res) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((prd) => prd.id === id);
  const user = users[userIndex];
  users.splice(userIndex, 1);
  res.status(201).json(user);
};
