import { useState, useEffect } from "react";
import {
  addOrder,
  getBookOrder,
  getSlotDetails,
} from "../../Service/SlotService";
import { getSessionUser } from "../../Service/UserService";
import BookBox from "./BookBox";
import BookBoxNA from "./BookBoxNA";
import "./BookSlots.css";

function BookSlots({ date, slot, estation, user, setText }) {
  const [order, setOrder] = useState([]);
  const [boothdatails, setBoothDetails] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [currentBoothId, setCurrentBoothId] = useState();
  const [vid, setVid] = useState();
  const [func, setFunc] = useState(false);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [orderDate, setOrderDate] = useState();

  const getOrder = async () => {
    const response = await getBookOrder(slot, estation);
    setOrder(response.data);
  };

  let dateArray = [];
  const getAllDates = () => {
    order.map((item) => {
      dateArray = [...dateArray, [new Date(item.orderDate), item.booth.bootid]];
    });
  };

  let alreadyBookedSlot = [];
  const matchDates = () => {
    dateArray.map((item) => {
      if (
        item[0].getDate() == date.getDate() &&
        item[0].getMonth() == date.getMonth() &&
        item[0].getYear() == date.getYear()
      ) {
        alreadyBookedSlot = [...alreadyBookedSlot, item[1]];
      }
    });
  };

  getAllDates();

  const printDates = () => {
    matchDates();
  };

  printDates();

  //get current user
  const getCurrentUser = async () => {
    const response = await getSessionUser();
    setCurrentUser(response.data.uid);
  };

  //place order
  const placeOrder = async () => {
    const response = await addOrder(
      currentUser,
      currentBoothId,
      slot,
      vid,
      date,
      user.type
    );

    console.log(response.data);

    if (user.type === "user") {
      setText("payment");
    } else {
      setText("order");
    }
  };

  //get booth details
  const getBooth = async () => {
    const response = await getSlotDetails(estation);
    setBoothDetails(response.data);
    setVid(response.data[0].user.uid);
  };

  useEffect(() => {
    getCurrentUser();
    getOrder();
    getBooth();
    //  getDateString();
  }, [deleteFlag]);

  useEffect(() => {
    placeOrder();
  }, [func]);

  const [activeId, setActiveId] = useState();

  return (
    <>
      <div className="headerbookslots">
        <h2>BookSlots</h2>
      </div>
      <div className="bookslots_s">
        <h3>Cars</h3>
        <hr />
        <div className="horzBoxes">
          {boothdatails?.map((val) => {
            if (val.type == "car") {
              if (
                alreadyBookedSlot.includes(val.bootid) |
                (val.status === "of")
              ) {
                return (
                  <BookBoxNA
                    text={val.bootid}
                    price={val.price}
                    vid={val.user.uid}
                    setCurrentBoothId={setCurrentBoothId}
                    setVid={setVid}
                    func={func}
                    setFunc={setFunc}
                    user={user}
                    setDeleteFlag={setDeleteFlag}
                    deleteFlag={deleteFlag}
                    setActiveId={setActiveId}
                    activeId={activeId}
                    status={val.status}
                  />
                );
              } else {
                return (
                  <BookBox
                    text={val.bootid}
                    price={val.price}
                    vid={val.user.uid}
                    setCurrentBoothId={setCurrentBoothId}
                    setVid={setVid}
                    func={func}
                    setFunc={setFunc}
                    user={user}
                    setDeleteFlag={setDeleteFlag}
                    deleteFlag={deleteFlag}
                    setActiveId={setActiveId}
                    activeId={activeId}
                    status={val.status}
                  />
                );
              }
            }
          })}
        </div>

        <h3>Buses</h3>
        <hr />
        <div className="horzBoxes">
          {boothdatails?.map((val) => {
            if (val.type == "bus") {
              if (
                alreadyBookedSlot.includes(val.bootid) |
                (val.status === "of")
              ) {
                return (
                  <BookBoxNA
                    text={val.bootid}
                    price={val.price}
                    vid={val.user.uid}
                    setCurrentBoothId={setCurrentBoothId}
                    setVid={setVid}
                    func={func}
                    setFunc={setFunc}
                    user={user}
                    setDeleteFlag={setDeleteFlag}
                    deleteFlag={deleteFlag}
                    setActiveId={setActiveId}
                    activeId={activeId}
                    status={val.status}
                  />
                );
              } else {
                return (
                  <BookBox
                    text={val.bootid}
                    price={val.price}
                    vid={val.user.uid}
                    setCurrentBoothId={setCurrentBoothId}
                    setVid={setVid}
                    func={func}
                    setFunc={setFunc}
                    user={user}
                    setDeleteFlag={setDeleteFlag}
                    deleteFlag={deleteFlag}
                    setActiveId={setActiveId}
                    activeId={activeId}
                    status={val.status}
                  />
                );
              }
            }
          })}
        </div>

        <h3>Trucks</h3>
        <hr />
        <div className="horzBoxes">
          {boothdatails?.map((val) => {
            if (val.type == "truck") {
              if (
                alreadyBookedSlot.includes(val.bootid) |
                (val.status === "of")
              ) {
                return (
                  <BookBoxNA
                    text={val.bootid}
                    price={val.price}
                    vid={val.user.uid}
                    setCurrentBoothId={setCurrentBoothId}
                    setVid={setVid}
                    func={func}
                    setFunc={setFunc}
                    user={user}
                    setDeleteFlag={setDeleteFlag}
                    deleteFlag={deleteFlag}
                    setActiveId={setActiveId}
                    activeId={activeId}
                    status={val.status}
                  />
                );
              } else {
                return (
                  <BookBox
                    text={val.bootid}
                    price={val.price}
                    vid={val.user.uid}
                    setCurrentBoothId={setCurrentBoothId}
                    setVid={setVid}
                    func={func}
                    setFunc={setFunc}
                    user={user}
                    setDeleteFlag={setDeleteFlag}
                    deleteFlag={deleteFlag}
                    setActiveId={setActiveId}
                    activeId={activeId}
                    status={val.status}
                  />
                );
              }
            }
          })}
        </div>

        {/* <BookBoxNA text = {val} /> */}
      </div>
    </>
  );
}

export default BookSlots;
