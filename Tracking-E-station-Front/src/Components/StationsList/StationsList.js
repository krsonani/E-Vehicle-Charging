import React, { useEffect, useState } from "react";
import { getEStationDetails } from "../../Service/Estation";
import "./StationsList.css";

function StationList({ text, setText, setEstation, city, bool, user }) {
  const [estation, setEstationDetail] = useState([]);
  const getEStation = async () => {
    const responce = await getEStationDetails(city);
    setEstationDetail(responce.data);
  };

  useEffect(() => {
    getEStation();
  }, [city, bool]);

  if (user.type === "user") {
    return (
      <>
        <div className="book-charging-slots">
          <div className="slot-grid">
            {estation.map((item) => (
              <div className="slot-card">
                <div className="slot-card-content">
                  <img
                    className="book-image"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHCNEkMRw9OxkGbljMfjcJw8QEW2uIH22e5w&usqp=CAU"
                    alt="tesla"
                  />
                  <h3 className="book-title">Name:&nbsp;{item.name}</h3>
                  <p className="book-location">City :&nbsp;{item.location}</p>
                  <div className="book-status">
                    {item.status === "on" ? (
                      <>
                        <div>
                          Available :&nbsp;{" "}
                          <i className="fa-solid fa-signal"></i>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          Not Available :&nbsp;
                          <img
                            src="https://tse4.mm.bing.net/th?id=OIP.X8VC9lzpZzynQEbpLAw1jAHaFS&pid=Api&P=0"
                            className="na-sym"
                            alt="Not Avalible"
                          ></img>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="book-vehicle-types">
                    <span>Vehicle Type :&nbsp;</span>
                    <div className="icons">
                      <i className="fa-solid fa-truck"></i>{" "}
                      <i className="fa-solid fa-car-side"></i>{" "}
                      <i className="fa-solid fa-van-shuttle"></i>
                    </div>
                  </div>
                  <div className="book-vehicle-types">
                    Location : &nbsp;
                    <a
                      href={`https://www.google.com/maps/search/${item.location}/@19.0821775,72.7163736`}
                      target="_blank"
                      style={{ textDecoration: "none", color: "black" }}
                      alt="location"
                    >
                      <i className="fas fa-map-marker-alt"></i>
                    </a>
                  </div>
                  {item.status === "on" ? (
                    <button
                      className="book-slot-button"
                      onClick={() => {
                        setText("timeslot");
                        setEstation(item.uid);
                      }}
                    >
                      Book Slot
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="book-charging-slots">
        <div className="slot-grid">
          <div className="slot-card">
            <div className="slot-card-content">
              <img
                className="book-image"
                src="https://media.wired.com/photos/63bc816a995aa119ba7ba802/4:3/w_2131,h_1598,c_limit/Biz-ev-charger-1242853588.jpg"
                alt="tesla"
              />
              <h3 className="book-title">Name:&nbsp;{user.name}</h3>
              <p className="book-location">Location :&nbsp;{user.location}</p>
              <div className="book-status">
                {user.status === "on" ? (
                  <>
                    <div>
                      Available :&nbsp; <i className="fa-solid fa-signal"></i>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      Not Available :&nbsp;
                      <img
                        src="https://st2.depositphotos.com/1890869/11340/v/950/depositphotos_113409186-stock-illustration-no-sign-vector.jpg"
                        className="na-sym"
                        alt="Not Avalible"
                      ></img>
                    </div>
                  </>
                )}
              </div>
              <div className="book-vehicle-types">
                <span>Vehicle Type :&nbsp;</span>
                <div className="icons">
                  <i className="fa-solid fa-truck"></i>{" "}
                  <i className="fa-solid fa-car-side"></i>{" "}
                  <i className="fa-solid fa-motorcycle"></i>{" "}
                  <i className="fa-solid fa-van-shuttle"></i>
                </div>
              </div>
              <div className="book-vehicle-types">
                Location : &nbsp;
                <a
                  href={`https://www.google.com/maps/place/${user.location}`}
                  target="_blank"
                  style={{ textDecoration: "none", color: "black" }}
                  alt="location"
                >
                  <i className="fas fa-map-marker-alt"></i>
                </a>
              </div>
              {user.status === "on" ? (
                <button
                  className="book-slot-button"
                  onClick={() => {
                    setText("timeslot");
                    setEstation(user.uid);
                  }}
                >
                  Book Slot
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StationList;
