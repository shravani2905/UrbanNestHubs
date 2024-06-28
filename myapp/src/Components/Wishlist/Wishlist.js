import React, { useState, useEffect, useContext } from "react";
import "./Wishlist.css";
import { UserContext } from "../../Contexts/UserContext";

const Wishlist = () => {
  const [user] = useContext(UserContext);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    if (user && user.username) {
      fetch(`http://localhost:4000/wishlists/${user.username}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && Array.isArray(data)) {
            setWishlistItems(data);
          }
        })
        .catch((err) => console.error("Error fetching wishlist:", err));
    }
  }, [user]);

  const addToWishlist = (property) => {
    fetch(`http://localhost:4000/wishlists/${user.username}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(property),
    })
      .then((res) => res.json())
      .then((data) => {
        setWishlistItems([...wishlistItems, data]);
      })
      .catch((err) => console.error("Error adding to wishlist:", err));
  };

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title">Your Wishlist</h2>
      <div className="wishlist-items">
        {wishlistItems.length === 0 ? (
          <p className="wishlist-empty">Your wishlist is empty.</p>
        ) : (
          wishlistItems.map((item) => (
            <div key={item.id} className="wishlist-item">
              <img src={item.image} alt={item.title} className="wishlist-image" />
              <div className="wishlist-details">
                <h3>{item.title}</h3>
                <p>
                  <b>Location: </b>
                  {item.location}
                </p>
                {/* Add other property details as needed */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;
