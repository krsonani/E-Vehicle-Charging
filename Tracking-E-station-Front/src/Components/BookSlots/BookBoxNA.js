import React, { useState } from "react";
import "./BookSlots.css";
import PricePopup from "./PricePopup";
function BookBoxNA({
  text,
  price,
  setCurrentBoothId,
  func,
  setFunc,
  user,
  setDeleteFlag,
  deleteFlag,
  status,
  setActiveId,
  activeId
}) {
  const [hasRender, setRender] = useState(false);
  const [boothId, setBoothId] = useState();

  const onShow = () => {
    setRender(true);
  };

  const onHide = () => {
    setRender(false);
  };

  return (
   
    <>
       {(() => { 
        if (user.type === "user") {
          return (
            <>
             <div
        className="bookboxNA"
        onClick={() => {
          setBoothId(text);
          setActiveId(text);
          setCurrentBoothId(text);
        }}
      >
        <p>{text}</p>
      </div>
            </>
          );

        }
        else { 
          return (
            <>
                  <div
        className="bookboxNA"
        onClick={() => {
          hasRender == false ? onShow() : onHide();
          setBoothId(text);
          setActiveId(text);
          setCurrentBoothId(text);
        }}
      >
        <p>{text}</p>
      </div>

      {hasRender && text == activeId && (
        <PricePopup
          boothId={text}
          deleteFlag={deleteFlag}
          setDeleteFlag={setDeleteFlag}
          user={user}
          status={status}
        />
      )}
            
            </>
          );
        }
    })()}

    </>
  );
}

export default BookBoxNA;
