import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import "./Navbar.css";

function Navbar() {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/home");
  };

  return (
    <div className="navbar">
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/008/075/444/small/the-logo-of-home-housing-residents-real-estate-with-a-concept-that-presents-rural-nature-with-a-touch-of-leaves-and-sunflowers-vector.jpg"
        width="80px"
        alt="Urban Nest Hubs Logo"
      />
      <h3 className="heading">Urban Nest Hubs</h3>

      <ul className="List">
        
        {!user ? (
          <>
          <li>
          <Link to="/home">
            <button className="btn nav button">Home</button>
          </Link>
        </li>
            <li>
              <Link to="/signup">
                <button className="btn nav button">Sign up</button>
              </Link>
            </li>
            <li>
              <Link to="/login">
                <button className="btn nav button">Login</button>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <span className="welcome-message text-warning">Welcome, {user.username}</span>
            </li>
            <li>
              <Link to="/buy">
                <button className="btn nav button">Buy</button>
              </Link>
            </li>
            <li>
              <Link to="/sell">
                <button className="btn nav button">Sell</button>
              </Link>
            </li>
            <li>
              <button className="btn nav button" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
