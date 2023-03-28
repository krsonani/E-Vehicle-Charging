import React, { useState } from "react";
import { deleteBooth, toggleStatus } from "../../Service/BoothService";
import "./PricePopup.css";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";

function PricePopup({
  price,
  placeOrder,
  func,
  setFunc,
  user,
  boothId,
  setDeleteFlag,
  deleteFlag,
  status,
}) {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const openModal = () => {
    setIsModalOpened(true);
  };
  const closeModal = () => {
    setIsModalOpened(false);
  };

  //delete booth

  const deleteCurrentBooth = async () => {
    const response = await deleteBooth(boothId);
    closeModal();
    setDeleteFlag(!deleteFlag);
  };

  const toggleOnOffStatus = async () => {
    const response = await toggleStatus(boothId);
    setDeleteFlag(!deleteFlag);
  };

  return (
    <>
      <div className="bottompopup">
        {(() => {
          if (user.type == "user") {
            return (
              <div className="pricebar">
                <div
                  style={{ textDecoration: "none" }}
                  onClick={() => {
                    setFunc(!func);
                  }}
                >
                  Pay Rs. {price}
                </div>
              </div>
            );
          } else {
            if (status === "on") {
              return (
                <div className="threebuttons">
                  <div className="pricebar">
                    <div
                      style={{ textDecoration: "none" }}
                      onClick={() => {
                        setFunc(!func);
                      }}
                    >
                      Place Custom Order
                    </div>
                  </div>

                  <div className="pricebar-toggle">
                    <div style={{ textDecoration: "none" }}>
                      <span> ON </span>
                      <label className="switch">
                        <input type="checkbox" />

                        <span
                          className="slider round"
                          onClick={() => {
                            toggleOnOffStatus();
                          }}
                        ></span>
                      </label>
                      <span> OFF </span>
                    </div>
                  </div>

                  <div className="deletebar">
                    <div
                      style={{ textDecoration: "none" }}
                      onClick={() => {
                        openModal();
                      }}
                    >
                      Delete Slot ({boothId})
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="pricebar-toggle">
                  <div style={{ textDecoration: "none" }}>
                    <span> OFF </span>
                    <label className="switch">
                      <input type="checkbox" />

                      <span
                        className="slider round"
                        onClick={() => {
                          toggleOnOffStatus();
                        }}
                      ></span>
                    </label>
                    <span> ON </span>
                  </div>
                </div>
              );
            }
          }
        })()}
      </div>

      <Modal show={isModalOpened} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this booth?</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={deleteCurrentBooth}>
            Yes, Delete
          </Button>
          <Button variant="danger" onClick={closeModal}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PricePopup;
