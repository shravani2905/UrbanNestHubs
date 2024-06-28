import React from "react";
import "./View.css";
import { useLocation } from "react-router-dom";
function View() {
  let { state } = useLocation();
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
          <p>
            <b>Rating: </b>
            {state.Rating}
          </p>
          <button className="btn pay">Pay</button>
        </div>
      </div>
    </div>
  );
}

export default View;
