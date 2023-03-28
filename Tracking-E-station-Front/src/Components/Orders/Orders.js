import React, { useEffect, useState } from "react";
import { confirmOrder, getOrder } from "../../Service/UserService";

import "./Orders.css";

function Orders({ id, type }) {
  const [order, setOrder] = useState([]);
  const [bool, setBool] = useState([]);

  const getOrders = async () => {
    const responce = await getOrder(id, type);
    setOrder(responce.data);
  };

  const confirmOrders = async (oid) => { 
    await confirmOrder(oid);
    setBool(!bool);

  }

  useEffect(() => {
    getOrders();
  }, [bool]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h2
        className="text-center mt-5 text-white p-1 w-50"
        style={{
          backgroundColor: "#2c3e50",
          textShadow: "1px 1px #2c3e50 !important",
        }}
      >
        Order's
      </h2>
      <div className="container w-100 mt-5">
        {(() => {
          if (type == "user") {
            return (
              <div className="table">
                <div className="table-header">
                  <div className="header__item">
                    <p id="name" className="filter__link">
                      Order Id
                    </p>
                  </div>
                  <div className="header__item">
                    <p id="wins" className="filter__link filter__link--number">
                      Name
                    </p>
                  </div>
                  <div className="header__item">
                    <p className="filter__link filter__link--number">Date</p>
                  </div>
                  <div className="header__item">
                    <p className="filter__link filter__link--number">Time</p>
                  </div>
                  <div className="header__item">
                    <p className="filter__link filter__link--number">
                      Booth-Id
                    </p>
                  </div>
                  <div className="header__item">
                    <p className="filter__link filter__link--number">price</p>
                  </div>
                  <div className="header__item">
                    <p
                      id="losses"
                      className="filter__link filter__link--number"
                    >
                      Status
                    </p>
                  </div>
                </div>
                <div className="table-content">
                  {order &&
                    order.map((item) => {
                      const date = new Date(item.orderDate);
                      return (
                        <div className="table-row">
                          <div className="table-data">#{item.oid}</div>
                          <div className="table-data">{item.vendor.name}</div>
                          <div className="table-data">
                            {date.getDate() +
                              "/" +
                              date.getMonth() +
                              "/" +
                              date.getFullYear()}
                          </div>
                          <div className="table-data">{item.tid}:00</div>
                          <div className="table-data">{item.booth.bootid}</div>
                          <div className="table-data">{item.booth.price}/-</div>
                          <div className="table-data">{item.status === "Confirmed" ? <p style={{color:"green"}}>
                            {item.status}
                          </p> :<p style={{color:"red"}}>{item.status}</p> }
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          } else {
            return (
              <div className="table">
                <div className="table-header">
                  <div className="header__item">
                    <p id="name" className="filter__link">
                      Order Id
                    </p>
                  </div>
                  <div className="header__item">
                    <p id="wins" className="filter__link filter__link--number">
                      Name
                    </p>
                  </div>
                  <div className="header__item">
                    <p className="filter__link filter__link--number">Date</p>
                  </div>
                  <div className="header__item">
                    <p className="filter__link filter__link--number">Time</p>
                  </div>
                  <div className="header__item">
                    <p className="filter__link filter__link--number">
                      Booth-Id
                    </p>
                  </div>
                  <div className="header__item">
                    <p className="filter__link filter__link--number">price</p>
                  </div>
                  <div className="header__item">
                    <p className="filter__link filter__link--number">status</p>
                  </div>
                  <div className="header__item">
                    <p
                      id="losses"
                      className="filter__link filter__link--number"
                    >
                      Action
                    </p>
                  </div>
                </div>
                <div className="table-content">
                  {order &&
                    order.map((item) => {
                      const date = new Date(item.orderDate);
                      return (
                        <div className="table-row">
                          <div className="table-data">#{item.oid}</div>
                          <div className="table-data">{item.user.name}</div>
                          <div className="table-data">
                            {date.getDate() +
                              "/" +
                              date.getMonth() +
                              "/" +
                              date.getFullYear()}
                          </div>
                          <div className="table-data">{item.tid}:00</div>
                          <div className="table-data">{item.booth.bootid}</div>
                          <div className="table-data">{item.booth.price}/-</div>
                          <div className="table-data">{item.status}</div>
                          <div className="table-data">
                            {item.status === 'Confirmed' ? <i class="fas fa-check fs-4" style={{
                              color
                            :"green"}}></i> :
                              <button className="btn btn-success" onClick={() => {
                                confirmOrders(item.oid);
                              }}>Confirm
                              </button>}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          }
        })()}
      </div>
    </div>
  );
}

export default Orders;
