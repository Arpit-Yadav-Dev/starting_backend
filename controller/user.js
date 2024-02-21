const fs = require("fs");
const model = require("../model/user");
const mongoose = require("mongoose");
const User = model.user;

exports.createUser = (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    console.log({ err, doc });
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(201).json(doc);
    }
  });
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
