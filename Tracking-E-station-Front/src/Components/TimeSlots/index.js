import React, { useEffect, useState } from "react";
import DatePicker from "react-horizontal-datepicker";
import TimeCard from "./TimeCard";

const timeSlotsData = [
  {
    vehicle: "Time Slots for Booking",
    slots: [
      {
        id: 0,
        slot: "12:00 AM",
        status: true,
      },
      {
        id: 1,
        slot: "1:00 AM",
        status: true,
      },
      {
        id: 2,
        slot: "2:00 AM",
        status: true,
      },
      {
        id: 3,
        slot: "3:00 AM",
        status: true,
      },
      {
        id: 4,
        slot: "4:00 AM",
        status: true,
      },
      {
        id: 5,
        slot: "5:00 AM",
        status: true,
      },
      {
        id: 6,
        slot: "6:00 AM",
        status: true,
      },
      {
        id: 7,
        slot: "7:00 AM",
        status: true,
      },
      {
        id: 8,
        slot: "8:00 AM",
        status: true,
      },
      {
        id: 9,
        slot: "9:00 AM",
        status: true,
      },
      {
        id: 10,
        slot: "10:00 AM",
        status: true,
      },
      {
        id: 11,
        slot: "11:00 AM",
        status: true,
      },
      {
        id: 12,
        slot: "12:00 PM",
        status: true,
      },
      {
        id: 13,
        slot: "1:00 PM",
        status: true,
      },
      {
        id: 14,
        slot: "2:00 PM",
        status: true,
      },
      {
        id: 15,
        slot: "3:00 PM",
        status: true,
      },
      {
        id: 16,
        slot: "4:00 PM",
        status: true,
      },
      {
        id: 17,
        slot: "5:00 PM",
        status: true,
      },
      {
        id: 18,
        slot: "6:00 PM",
        status: true,
      },
      {
        id: 19,
        slot: "7:00 PM",
        status: true,
      },
      {
        id: 20,
        slot: "8:00 PM",
        status: true,
      },
      {
        id: 21,
        slot: "9:00 PM",
        status: true,
      },
      {
        id: 22,
        slot: "10:00 PM",
        status: true,
      },
      {
        id: 23,
        slot: "11:00 PM",
        status: true,
      },
    ],
  },
];

const TimeSlots = ({ setText, setDate, setSlote }) => {
  const [startDate, setStartDate] = useState(new Date());
  const date = new Date();
  const [time, setTime] = useState(startDate.getHours());

  
  useEffect(() => {
    if (startDate.getDate() == date.getDate()) {
      setTime(new Date().getHours());
    } else {
      setTime(startDate.getHours());
    }
  }, [startDate, time]);


  return (
    <div className="m-4">
      <h1 style={{ display: "flex", justifyContent: "center" }}>TimeSlots</h1>
      <div className="row">
        <div className="col-sm-12 col-md-8 col-lg-6">
          <DatePicker
            endDate={3}
            getSelectedDay={setStartDate}
            labelFormat={"MMMM"}
            color={"#374e8c"}
            selectDate={startDate}
          />
        </div>
      </div>

      {timeSlotsData?.map(({ vehicle, slots }, index) => (
        <div className="row p-2" key={index}>
          <h5 className="mt-4">{vehicle}</h5>
          {slots?.map(({ slot, status, id }, index) => {
            if (id >time) {
              return (
                <div
                  className="col-sm-6 col-md-4 col-lg-2 col-xl-2 p-2"
                  onClick={() => {
                    setText("bookslots");
                    setDate(startDate);
                    setSlote(id);
                  }}
                  key={index}
                >
                  <TimeCard cardText={slot} status={status} />
                </div>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default TimeSlots;
