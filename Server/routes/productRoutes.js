const express = require("express");
const router = express.Router();
const Product = require("../models/Products"); 

// API to Get All Products
router.get("/allproducts", async (req, res) => {
  try {
    const products = await Product.find({});
    
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// api for newCollections
router.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  res.send(newcollection);
});

//popular in women category
router.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popular_in_women = products.slice(0, 4);
  res.send(popular_in_women);
});

module.exports = router;
