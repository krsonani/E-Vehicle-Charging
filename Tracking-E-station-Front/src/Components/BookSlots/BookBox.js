import React, { useEffect, useState } from "react";
import "./BookSlots.css";
import PricePopup from "./PricePopup";

function BookBox({
  text,
  price,
  vid,
  setCurrentBoothId,
  setVid,
  func,
  setFunc,
  user,
  setDeleteFlag,
  deleteFlag,
  setActiveId,
  activeId,
  status,
}) {
  const [hasRender, setRender] = useState(false);
  const [boothId, setBoothId] = useState(text);
  const [bool, setBool] = useState(false);

  const onShow = () => {
    setRender(true);
  };

  const onHide = () => {
    setRender(false);
  };
  useEffect(() => {}, [bool]);

  return (
    <>
      <div
        // className={text == activeId
        //   ? "selectedBookbox"
        //   : "bookbox"}

        className={text == activeId ? "selectedBookbox" : "bookbox"}
        onClick={() => {
          setCurrentBoothId(text);
          setBoothId(text);
          setActiveId(text);
          setVid(vid);
          onShow();
          setBool(!bool);
        }}
        onDoubleClick={() => {
          setActiveId("");
          onHide();
          setBool(!bool);
        }}
      >
        <p>{text}</p>
      </div>

      {hasRender && text == activeId && (
        <PricePopup
          price={price}
          func={func}
          setFunc={setFunc}
          status={status}
          user={user}
          boothId={text}
          setDeleteFlag={setDeleteFlag}
          deleteFlag={deleteFlag}
        />
      )}
    </>
  );
}

export default BookBox;
