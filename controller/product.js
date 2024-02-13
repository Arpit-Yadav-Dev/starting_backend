const fs = require("fs");
const model = require("../model/product");
const mongoose = require("mongoose");
const Product = model.Product;

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    const savedProduct = await product.save();
    res.status(201).json({ message: "Data Added Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  res.json(product);
};

exports.replaceProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndReplace({ _id: id }, req.body);
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndUpdate({ _id: id }, req.body);
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndDelete({ _id: id });
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};
