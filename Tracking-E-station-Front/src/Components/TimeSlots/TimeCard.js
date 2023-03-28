import React from "react";

const TimeCard = ({ cardText, status }) => {
  return (
    <div
      className="card"
      style={{ backgroundColor: status ? "green" : "grey" }}
    >
      <div
        className="card-header"
        style={{ textAlign: "center", color: "white" }}
      >
        <h6>{cardText}</h6>
      </div>
    </div>
  );
};

export default TimeCard;
