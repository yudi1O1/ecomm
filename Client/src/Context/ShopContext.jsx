import React, { createContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { allProducts, getCart, adToCart, removeCart } from "../utils/APIRoutes";

export const ShopContext = createContext(null);
const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    axios
      .get(allProducts)
      .then((res) => setAll_Product(res.data))
      .catch((err) => console.error(err));

    if (localStorage.getItem("auth-token")) {
      axios
        .post(getCart,
          {}, // Empty body
          {
            headers: {
              Accept: "application/form-data",
              "auth-token": `${localStorage.getItem("auth-token")}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => setCartItems(res.data))
        .catch((err) => console.error(err));
    }
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  
    if (localStorage.getItem("auth-token")) {
      axios
        .post(adToCart,
          { ItemId: itemId }, // Request body
          {
            headers: {
              Accept: "application/form-data",
              "auth-token": localStorage.getItem("auth-token"),
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => console.log(res.data))
        .catch((err) => console.error(err));
    }
  };



  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev, [itemId]: prev[itemId] - 1 };
      if (updatedCart[itemId] <= 0) delete updatedCart[itemId]; // Remove item if count is 0
      return updatedCart;
    });
  
    if (localStorage.getItem("auth-token")) {
      try {
        const response = await axios.post(
          removeCart,
          { ItemId: itemId },
          {
            headers: {
              Accept: "application/form-data",
              "auth-token": localStorage.getItem("auth-token"),
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
