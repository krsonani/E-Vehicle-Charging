import axios from "axios";

const BASE_URL = "http://43.205.241.122:8080";

export function getEStationDetails(city) {
  return axios.get(`${BASE_URL}/getStation/${city}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("jwtToken"),
    },
  });
}
