const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: String,
  price: { type: Number, required: true },
  discountPercentage: {
    type: Number,
    min: [0, "discount can not be less then 0"],
    max: [50, "discount can not be greater then 50"],
  },
  rating: {
    type: Number,
    min: [1, "rating can not be less then 1"],
    max: [5, "rating can not be greater then 5"],
    default: 1,
  },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: [String],
});

exports.Product = mongoose.model("Product", productSchema);
