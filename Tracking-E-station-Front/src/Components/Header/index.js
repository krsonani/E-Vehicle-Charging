import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const signin = () => {
    navigate("/signin");
  };
  const signup = () => {
    navigate("/signup");
  };

  return (
    <nav className="navbar navbar-dark bg-dark justify-content-between">
      <div className="px-2">
        <img src="logo.png" alt="" height="45px" />
      </div>
      <div>
        <a href="#features" className="btn mx-2 text-white ">
          Features
        </a>
        <button className="btn mx-2 text-white " onClick={signin}>
          Sign In
        </button>
        <button className="btn mx-2 text-white" onClick={signup}>
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Header;
