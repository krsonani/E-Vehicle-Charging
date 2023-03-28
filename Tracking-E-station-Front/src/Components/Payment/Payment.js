import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import "./Payment.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

function Payment({ price, setText}) {
  const navigate = useNavigate();

  const payment = () => {
    navigate("/dashbord");
  };

  return (
    <div class="payment-main">
      <div class="payment-card px-4  ">
        <p class="h3 py-3">Payment Details</p>
        <div class="row gx-3">
          <div class="col-12">
            <div class="d-flex flex-column">
              <p class="payemnt-text mb-1">Person Name</p>
              <input
                class="payment-input mb-3"
                type="text"
                placeholder="Name"
              />
            </div>
          </div>
          <div class="col-12">
            <div class="d-flex flex-column">
              <p class="payemnt-text mb-1">Card Number</p>
              <input
                class="payment-input mb-3"
                type="text"
                placeholder="1234 5678 4356 7831
                          "
              />
            </div>
          </div>
          <div class="col-6">
            <div class="d-flex flex-column">
              <p class="payemnt-text mb-1">Expiry</p>
              <input
                class="payment-input mb-3"
                type="text"
                placeholder="MM/YYYY"
              />
            </div>
          </div>
          <div class="col-6">
            <div class="d-flex flex-column">
              <p class="payemnt-text mb-1">CVV/CVC</p>
              <input
                class="payment-input mb-3 pt-2 "
                type="password"
                placeholder="***"
                maxLength={3}
              />
            </div>
          </div>
          <div class="col-12">
            <div class="payment-btn mb-3" onClick={()=>{
              setText("order");
            }}>
              <span class="ps-3">Confirm Payment</span>
              <span class="fas fa-arrow-right"></span>
              
            </div>
          </div>
        </div>
      </div>
    
    </div>
  );
}

export default Payment;
