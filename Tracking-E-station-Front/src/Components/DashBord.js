import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { useNavigate } from "react-router-dom";
import "./DashBord.css";
import UpdateProfile from "./UpdateProfile/UpdateProfile";
import StationsList from "./StationsList/StationsList";
import BookSlots from "./BookSlots/BookSlots";
import Orders from "./Orders/Orders";
import { useEffect, useState } from "react";
import TimeSlots from "./TimeSlots";
import Registration from "./Registration/Registration";

import {
  deleteAccount,
  getSessionUser,
  signoutUser,
  changeAvailibilty,
} from "../Service/UserService";
import ChangePassword from "./ChangePassword/ChangePassword";
import axios from "axios";
import Payment from "./Payment/Payment";

export default function DashBord() {
  const [text, setText] = useState("StationsList");
  const [date, setDate] = useState();
  const [slot, setSlote] = useState();
  const [estation, setEstation] = useState();
  const [city, setCity] = useState("BARODA");
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [bool, setBool] = useState(false);

  const BASE_URL = "http://43.205.241.122:8080";
  useEffect(() => {
    const token = sessionStorage.getItem("jwtToken");
    if (!token) {
      navigate("/signin");
      return;
    }
    // Verify the token's validity
    axios
      .get(`${BASE_URL}/api/verifytoken`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          // Token is valid, do nothing
          return;
        }
      })
      .catch((error) => {
        console.error(error);
        sessionStorage.removeItem("jwtToken");
        navigate("/signin");
      });
  }, [text, city, user, bool, slot, estation, date]);

  function callCompo(val) {
    setText(val);
  }
  const signout = async () => {
    const responce = await signoutUser();
    sessionStorage.clear();
    navigate("/Signin");
  };
  const deleteAcc = async () => {
    const responce = await deleteAccount(user);
    navigate("/");
  };

  const getUser = async () => {
    const response = await getSessionUser();
    setUser(response.data);
  };

  const setAvailibilty = async () => {
    const response = await changeAvailibilty(user);
    setBool(!bool);
  };
  useEffect(() => {
    getUser();
  }, [bool]);

  return (
    <div className="dashboard">
      <div className="sidebar-dashboard">
        <div className="sidebar-header-dashboard">
          <h3 className="mx-5 px-1">Dashbord</h3>
        </div>
        <ul className="sidebar-menu-dashboard d-flex flex-column justify-content-between align-items-left">
          {(() => {
            if (user.type == "user") {
              return (
                <div>
                  <li
                    className="d-flex gap-2 align-items-center"
                    onClick={() => {
                      callCompo("updateProfile");
                    }}
                  >
                    <i className="fas fa-user-edit"></i>
                    Edit Profile
                  </li>

                  <li
                    className="d-flex gap-2 align-items-center"
                    onClick={() => {
                      callCompo("changePassword");
                    }}
                  >
                    <i className="fas fa-user-edit"></i>
                    Change Password
                  </li>

                  <li
                    className="d-flex gap-2 align-items-center"
                    onClick={() => callCompo("order")}
                  >
                    <i className="fas fa-shopping-cart"></i>
                    My Orders
                  </li>
                </div>
              );
            } else if (user.type == "vendor") {
              return (
                <div>
                  <li
                    className="d-flex gap-2 align-items-center"
                    onClick={() => {
                      setCity(user.location);
                      callCompo("StationsList");
                    }}
                  >
                    <i class="fa fa-university" aria-hidden="true"></i>
                    EC-station
                  </li>
                  <li
                    className="d-flex gap-2 align-items-center"
                    onClick={() => {
                      callCompo("updateProfile");
                    }}
                  >
                    <i className="fas fa-user-edit"></i>
                    Edit Profile
                  </li>

                  <li
                    className="d-flex gap-2 align-items-center"
                    onClick={() => {
                      callCompo("changePassword");
                    }}
                  >
                    <i className="fas fa-user-edit"></i>
                    Change Password
                  </li>

                  <li
                    className="d-flex gap-2 align-items-center"
                    onClick={() => callCompo("order")}
                  >
                    <i className="fas fa-shopping-cart"></i>
                    My Orders
                  </li>
                  <li
                    className="d-flex gap-2 align-items-center"
                    onClick={() => callCompo("registration")}
                  >
                    <i className="fas fa-store"></i>
                    Register Booth
                  </li>
                  <li
                    className="d-flex gap-2 align-items-center"
                    onClick={setAvailibilty}
                  >
                    <i className="fas fa-calendar-alt"></i>
                    Change Availability
                  </li>
                </div>
              );
            }
          })()}

          <div>
            <li className="d-flex gap-2 align-items-center" onClick={deleteAcc}>
              <i className="fas fa-trash-alt"></i>
              Delete Account
            </li>
            <li className="d-flex gap-2 align-items-center" onClick={signout}>
              <i className="fas fa-sign-out-alt"></i>
              Logout
            </li>
          </div>
        </ul>
      </div>
      <div className="content-dashboard" style={{ overflowY: "scroll" }}>
        <header className="dashboard-header">
          <div className="header-left-dashboard">
            <div className="header-logo-dashboard">
              <img src="logo.png" alt="Logo" />
            </div>
            {user.type === "user" ? (
              <div className="header-city-dashboard">
                <span class="header-label-dashboard">Select City :</span>
                <select
                  className="header-dropdown-dashboard"
                  onClick={() => {
                    callCompo("StationsList");
                  }}
                  onChange={(event) => {
                    setCity(event.target.value);
                    callCompo("StationsList");
                  }}
                >
                  <option value="BARODA" className="k-city-option">
                    Select City
                  </option>
                  <option value="BARODA" className="k-city-option">
                    Baroda
                  </option>
                  <option value="Mumbai" className="k-city-option">
                    Mumbai
                  </option>
                  <option value="Pune" className="k-city-option">
                    Pune
                  </option>
                  <option value="Nashik" className="k-city-option">
                    Nashik
                  </option>
                  <option value="Delhi" className="k-city-option">
                    Delhi
                  </option>
                  <option value="Kolkata" className="k-city-option">
                    Kolkata
                  </option>
                </select>
              </div>
            ) : null}
          </div>
          <div className="header-right-dashboard">
            <div class="header-user-dashboard">
              <span class="header-label-dashboard">Welcome,{user.name}</span>
              <button class="header-button-dashboard">
                <i class="fas fa-user"></i>
              </button>
            </div>
          </div>
        </header>
        <div>
          {text == "StationsList" ? (
            <StationsList
              text={text}
              setText={setText}
              setEstation={setEstation}
              city={city}
              bool={bool}
              user={user}
            ></StationsList>
          ) : text == "updateProfile" ? (
            <UpdateProfile
              user={user}
              bool={bool}
              setBool={setBool}
            ></UpdateProfile>
          ) : text == "order" ? (
            <Orders id={user.uid} type={user.type}></Orders>
          ) : text == "timeslot" ? (
            <TimeSlots
              setText={setText}
              setDate={setDate}
              setSlote={setSlote}
            ></TimeSlots>
          ) : text == "bookslots" ? (
            <BookSlots
              date={date}
              slot={slot}
              estation={estation}
              user={user}
              setText={setText}
            />
          ) : text == "registration" ? (
            <Registration></Registration>
          ) : text == "changePassword" ? (
            <ChangePassword user={user} setUser={setUser} />
          ) : text == "payment" ? (
            <Payment setText={setText} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
