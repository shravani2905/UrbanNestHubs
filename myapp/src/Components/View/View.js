// src/View.js
import React, { useState } from "react";
import "./View.css";
import { useLocation } from "react-router-dom";

function View() {
  const { state } = useLocation();
  const [wishlistMessage, setWishlistMessage] = useState("");

  const addToWishlist = () => {
    fetch("http://localhost:4000/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    })
      .then((res) => res.json())
      .then((data) => {
        setWishlistMessage("Added to Wishlist!");
        console.log("Added to Wishlist:", data);
      })
      .catch((err) => console.error("Error adding to Wishlist:", err));
  };

  return (
    <div className="viewdata">
      <h3 className="title">{state.title}</h3>
      <div className="card card1 head1">
        <div className="flex1">
          <img src={state.image} alt="" width="300px" height="200px" />
        </div>
        <div className="card-body flex2">
          <p className="text-success fw-bold">
            {state.type === "Buy" ? "FOR SALE" : "FOR RENT"}
          </p>
          <p>
            <b>Location: </b>
            {state.location}
          </p>
          <p>
            <b>Cost: </b>
            {state.cost}
          </p>
          <p>
            <b>Area: </b>
            {state.squareFeet}
          </p>
          <button className="btn pay">Pay</button>
          <button className="btn wishlist" onClick={addToWishlist}>
            Add to Wishlist
          </button>
          {wishlistMessage && <p className="wishlist-message">{wishlistMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default View;
