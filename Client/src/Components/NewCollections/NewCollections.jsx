import React, { useEffect, useState } from "react";
import axios from "axios"; 
import "./NewCollections.css";
import Items from "../Items/Items";
import { newcollections } from "../../utils/APIRoutes";

const NewCollections = () => {
  const [newCollection, setNewCollection] = useState([]);

  useEffect(() => {
    axios
      .get(newcollections)
      .then((response) => {
        setNewCollection(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {newCollection.map((item) => (
          <Items
            key={item.id}
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

export default NewCollections;
