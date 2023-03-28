import axios from "axios";

const BASE_URL = "http://43.205.241.122:8080";

export function getBookOrder(tid, esid) {
  return axios.get(`${BASE_URL}/getOrders/${esid}/${tid}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("jwtToken"),
    },
  });
}

export function addslot(data, noOfBooth, id) {
  return axios.post(`${BASE_URL}/addBooth/${noOfBooth}/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("jwtToken"),
    },
  });
}

export function getSlotDetails(vid) {
  return axios.get(`${BASE_URL}/getBoothDetails/${vid}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("jwtToken"),
    },
  });
}

export function addOrder(uid, boothid, tid, vid, date, type) {
  return axios.get(
    `${BASE_URL}/addOrder/${uid}/${boothid}/${tid}/${vid}/${date}/${type}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("jwtToken"),
      },
    }
  );
}
