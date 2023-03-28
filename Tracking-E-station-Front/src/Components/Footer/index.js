import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p className="text-muted">
          Copyright © 2023 ec-station Tracking. All Rights Reserved.
        </p>
        <div className="contact-us">
          <h3>Contact Us</h3>
          <ul>
            <li>
              <a href="tel:999-999-9999">9999-999-999</a>
            </li>
            <li>
              <a href="mailto:evcharging.contactus@gmail.com">
                evcharging.contactus@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
