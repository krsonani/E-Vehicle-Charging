import React, { useEffect, useState } from "react";
import { addslot } from "../../Service/SlotService";
import { getSessionUser } from "../../Service/UserService";
import "./Registration.css";
export default function Registration() {
  let [data, setData] = useState({ type: "car" });
  const [user, setUser] = useState();
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const noOfBooth = document.getElementById("noOfBooth").value;

    const response = await addslot(data, noOfBooth, user.uid);

    document.getElementById("price").value = "";
    document.getElementById("noOfBooth").value = "";

    if (response.data === "success") {
      document.getElementById("success-box").innerHTML =
        "Booths Successfully Added";
      setTimeout(() => {
        document.getElementById("success-box").innerHTML = "";
      }, 4000);
    }
    setData({});
  };

  const getUser = async () => {
    const response = await getSessionUser();
    setUser(response.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="registrationBooth-profile">
      <h2 className="registrationBooth-profile-title text-center">
        Add New Charging Booth
      </h2>
      <form className="registrationBooth-profile-form" onSubmit={handleSubmit}>
        <div className="form-group-registrationBooth">
          <label htmlFor="vehicle" className="form-label-registrationBooth">
            Vehicle Type
          </label>
          <select
            id="vehicle"
            name="type"
            onChange={handleChange}
            className="form-input-registrationBooth"
          >
            <option value="car">Car</option>
            <option value="bus">Bus</option>
            <option value="truck">Truck</option>
          </select>
        </div>
        <div className="form-group-registrationBooth">
          <label htmlFor="booth" className="form-label-registrationBooth">
            Number of Booth
          </label>
          <input
            type="text"
            name="noOfBooth"
            onChange={handleChange}
            id="noOfBooth"
            className="form-input-registrationBooth"
            placeholder="Enter number Of booth"
          />
        </div>
        <div className="form-group-registrationBooth">
          <label htmlFor="booth" className="form-label-registrationBooth">
            Price/booth
          </label>
          <input
            type="text"
            className="form-input-registrationBooth"
            name="price"
            id="price"
            onChange={handleChange}
            placeholder="Enter Price or booth"
          />
        </div>
        <div id="success-box"></div>
        <button className="form-button-registrationBooth" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
