const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Removes leading/trailing whitespace
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  new_price: {
    type: Number,
    required: true,
    min: 0, // Ensures price is not negative
  },
  old_price: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

// Creating the Product model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
