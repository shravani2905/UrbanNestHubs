import "./Buy.css";
import Property from "../Property/Property";
import { useEffect, useState } from "react";

function Buy() {
  const [propertiesdata, setPropertiesData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/properties`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((properties) => {
        setPropertiesData(properties)
      })
      
      .catch((err) => console.log("Error fetching properties", err));
  }, []);

  return (
    <div className="buypropertiesdata">
      <div className="row1">
        {propertiesdata.map((property) => (
          <Property key={property.id} data={property} />
        ))}
      </div>
    </div>
  );
}

export default Buy;
