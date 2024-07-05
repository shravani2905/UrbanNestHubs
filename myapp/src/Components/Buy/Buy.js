import "./Buy.css";
import Property from "../Property/Property";
import { useEffect, useState } from "react";

function Buy() {
  const [propertiesData, setPropertiesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(`http://localhost:4000/properties`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((properties) => {
        setPropertiesData(properties);
      })
      .catch((err) => console.log("Error fetching properties", err));
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProperties = propertiesData.filter((property) =>
    Object.values(property).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="buypropertiesdata">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title, location, etc..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="row1">
        {filteredProperties.map((property) => (
          <Property key={property.id} data={property} />
        ))}
      </div>
    </div>
  );
}

export default Buy;
