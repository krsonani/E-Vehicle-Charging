import axios from "axios";

const BASE_URL = "http://43.205.241.122:8080";

export function deleteBooth(id) {
  return axios.delete(`${BASE_URL}/deleteBooth/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("jwtToken"),
    },
  });
}

export function toggleStatus(id) {
  return axios.get(`${BASE_URL}/changeBoothStatus/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("jwtToken"),
    },
  });
}
