import React, { useState, useEffect, useContext } from "react";
import "./Wishlist.css";
import { UserContext } from "../../Contexts/UserContext";
import Property from "../Property/Property"; // Import the Property component

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

  const handleRemove = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:4000/wishlists/${itemId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Update state to remove the item from the wishlist
        setWishlistItems(wishlistItems.filter((item) => item.id !== itemId));
      } else {
        console.error("Failed to remove item from wishlist");
      }
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title">Your Wishlist</h2>
      <div className="wishlist-items">
        {wishlistItems.length === 0 ? (
          <p className="wishlist-empty">Your wishlist is empty.</p>
        ) : (
          <div className="row1">
            {wishlistItems.map((item, index) => (
              <Property
                key={index}
                data={item.property}
                onRemove={() => handleRemove(item.id)} // Pass the remove handler
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
