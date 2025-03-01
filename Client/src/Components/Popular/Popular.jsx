import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Popular.css";
import Items from "../Items/Items";
import { popularinwomen } from "../../utils/APIRoutes";



const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    axios
      .get(popularinwomen)
      .then((response) => setPopularProducts(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {popularProducts.map((item, i) => (
          <Items
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;
