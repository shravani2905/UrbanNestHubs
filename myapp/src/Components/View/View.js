// src/View.js
import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import "./View.css";
import { UserContext } from "../../Contexts/UserContext";

function View() {
  const { state } = useLocation();
  const [user] = useContext(UserContext);
  const [property, setProperty] = useState(state || {});

  const addToWishlist = () => {
    const wishlistItem = {
      username: user.username,
      property: property,
    };

    fetch(`http://localhost:4000/wishlists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wishlistItem),
    })
      .then((res) => res.json())
      .then((addedProperty) => {
        alert("Property added to wishlist!");
      })
      .catch((err) => console.error("Error adding to wishlist:", err));
  };

  return (
    <div className="viewdata">
      <h3 className="title">{property.title}</h3>
      <div className="card card1 head1">
        <div className="flex1">
          <img src={property.image} alt={property.title} width="300px" height="200px" />
        </div>
        <div className="card-body flex2">
          <p className="text-success fw-bold">
            {property.type === "Buy" ? "FOR SALE" : "FOR RENT"}
          </p>
          <p>
            <b>Location: </b>
            {property.location}
          </p>
          <p>
            <b>Cost: </b>
            {property.cost}
          </p>
          <p>
            <b>Area: </b>
            {property.squareFeet}
          </p>
          <button className="btn pay">Buy</button>
          <button className="btn wishlist" onClick={addToWishlist}>
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}

export default View;
