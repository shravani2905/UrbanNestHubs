import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import "./View.css";
import { UserContext } from "../../Contexts/UserContext";

function View() {
  const { state } = useLocation();
  const [user] = useContext(UserContext);
  const [property, setProperty] = useState(state || {});
  const [contact, setContact] = useState("");

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
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Failed to add property to wishlist");
      })
      .then(() => {
        alert("Property added to wishlist!");
      })
      .catch((err) => console.error("Error adding to wishlist:", err));
  };

  const handleBuy = () => {
    const buyerDetails = prompt("Please enter your contact information:");

    if (!buyerDetails) {
      alert("Contact information is required to proceed with the purchase.");
      return;
    }

    const buyRequest = {
      username: user.username,
      property: property,
      status: "Pending",
      buyerDetails: buyerDetails,
    };

    fetch(`http://localhost:4000/buyRequests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buyRequest),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Failed to add buy request");
      })
      .then(() => {
        alert("Buy request added!");
      })
      .catch((err) => console.error("Error adding buy request:", err));
  };

  return (
    <div className="viewdata">
      <h3 className="title">{property.title}</h3>
      <div className="card card1 head1">
        <div className="flex1">
          <img
            src={property.image}
            alt={property.title}
            width="300px"
            height="200px"
          />
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
          <p>
            <b>Seller:</b>
            {property.seller}
          </p>
          <button className="btn pay" onClick={handleBuy}>
            Buy
          </button>
          <button className="btn wishlist" onClick={addToWishlist}>
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}

export default View;
