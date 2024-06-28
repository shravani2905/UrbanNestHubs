import "./Property.css";
import { useNavigate } from "react-router-dom";
function Property(props) {
  let navigate = useNavigate();
  const handleViewDetails = () => {
    navigate("/view", { state: props.data });
  };
  return (
    <div className="card head">
      <img src={props.data.image} alt="" width="300px" height="200px" />
      <div className="card-body">
        <p>{props.data.title}</p>
        <p>
          <b>Location: </b>
          {props.data.location}
        </p>
        <p>
          <b>Rating: </b>
          {props.data.Rating}
        </p>
        <button className="btn profile" onClick={handleViewDetails}>
          View Details
        </button>
      </div>
    </div>
  );
}
export default Property;
