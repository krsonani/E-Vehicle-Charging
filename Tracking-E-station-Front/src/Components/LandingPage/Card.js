import React from "react";

const Card = ({ title, description, imageSrc }) => {
  return (
    <div className="card shadow">
      <img src={imageSrc} className="card-img-top" alt="..." height="550px" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
};

export default Card;
