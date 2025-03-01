const router = require("express").Router();
const Users = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken'); // jwt 1
const fetchUser = require("../middleware/fetchUser");


//registering the user
router.post("/register", async (req, res) => {

    try {
        console.log(req.body);

    
    
    let check = await Users.findOne({ email: req.body.email });
    console.log(check);
    
  if (check) {
    res.status(400).json({
      success: false,
      errors: "existing user found with the same email address",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    cartData: cart,
  });
  await user.save();
  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, errors: "Internal server error"});
        
    }
    
});

// loging in the user

router.post("/login", async (req, res) => {
  console.log(req.body);
  
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = await bcrypt.compare(req.body.password, user.password);
    console.log(passCompare);
    
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Wrong Password" });
    }
  } else {
    res.json({ success: false, errors: "wrong email-id" });
  }
});


//endpoint for adding to cart
router.post("/addtocart", fetchUser, async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.ItemId] += 1;
    await Users.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );
    res.send("Added");
  });
  
  //creating endpoint to remove product from cart data
  
  router.post("/removefromcart", fetchUser, async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id });
  
    if (userData.cartData[req.body.itemId] > 0)
      userData.cartData[req.body.ItemId] -= 1;
    await Users.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );
    res.send("Deleted");
  });
  
  //creating endpoint for getting  cart data
router.post("/getcart", fetchUser, async (req, res) => {
    
    let userData = await Users.findOne({ _id: req.user.id });
    res.json(userData.cartData);
  });
  

  

  module.exports = router