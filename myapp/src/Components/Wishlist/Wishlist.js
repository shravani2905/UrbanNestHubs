// src/Wishlist.js
import React, { useState, useEffect, useContext } from "react";
import "./Wishlist.css";
import { UserContext } from "../../Contexts/UserContext";

const Wishlist = () => {
  const [user] = useContext(UserContext);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    if (user && user.username) {
      fetch(`http://localhost:4000/wishlists?username=${user.username}`)
        .then((res) => res.json())
        .then((data) => {
          setWishlistItems(data);
        })
        .catch((err) => console.error("Error fetching wishlist:", err));
    }
  }, [user]);

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title">Your Wishlist</h2>
      <div className="wishlist-items">
        {wishlistItems.length === 0 ? (
          <p className="wishlist-empty">Your wishlist is empty.</p>
        ) : (
          wishlistItems.map((item, index) => (
            <div key={index} className="wishlist-item">
              <img src={item.property.image} alt={item.property.title} className="wishlist-image" />
              <div className="wishlist-details">
                <h3>{item.property.title}</h3>
                <p>
                  <b>Location: </b>
                  {item.property.location}
                </p>
                <p>
                  <b>Cost: </b>
                  {item.property.cost}
                </p>
                <p>
                  <b>SquareFeet: </b>
                  {item.property.squareFeet}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;
