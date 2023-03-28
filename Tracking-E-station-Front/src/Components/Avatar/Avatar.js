import React from "react";
import "./Avatar.css";

function Avatar() {
  return (
    <div className="firstpart">
      <div className="circle">
        <div className="image"></div>
      </div>

      <p className="name">
        Akshay Parkad <i className="fa-solid fa-circle"></i>{" "}
      </p>
    </div>
  );
}

export default Avatar;
