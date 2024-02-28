const fs = require("fs");
const model = require("../model/product");
const mongoose = require("mongoose");
const Product = model.Product;
const ejs = require("ejs");
const path = require("path");

exports.getAllProductsSSR = async (req, res) => {
  try {
    const products = await Product.find();
    ejs.renderFile(
      path.resolve(__dirname, "../pages/index.ejs"),
      { products: products },

      function (err, str) {
        res.send(str);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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

// http://localhost:8080/products?price=-1   but working below one !!
exports.getAllProducts = async (req, res) => {
  try {
    console.log(req.query)
    let query = Product.find();
    if (req.query) {
      const products = await query.sort(req.query).exec();
      res.json(products);
    } else {
      const products = await query.exec();
      res.json(products);
    }
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
