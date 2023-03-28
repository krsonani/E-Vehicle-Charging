import axios, { Axios } from "axios";

const BASE_URL = "http://43.205.241.122:8080";

export function addUser(data) {
  return axios.post(`${BASE_URL}/addUser`, data);
}

export function getUserData(data) {
  return axios.post(`${BASE_URL}/getUser`, data);
}

export function deleteAccount(data) {
  return axios.post(`${BASE_URL}/deleteAccount`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("jwtToken"),
    },
  });
}

export function signoutUser() {
  return axios.get(`${BASE_URL}/signout`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("jwtToken"),
    },
  });
}

export function getSessionUser() {
  return axios.get(`${BASE_URL}/getSession`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("jwtToken"),
    },
  });
}

export function changeAvailibilty(data) {
  return axios.post(`${BASE_URL}/changeAvailibilty`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("jwtToken"),
    },
  });
}

export function getAllUsers(type) {
  return axios.get(`${BASE_URL}/getAlluser/${type}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("jwtToken"),
    },
  });
}

export function deleteById(id) {
  return axios.delete(`${BASE_URL}/deleteAccount/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("jwtToken"),
    },
  });
}

export function getOrder(id, type) {
  return axios.get(`${BASE_URL}/getOrder/${id}/${type}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("jwtToken"),
    },
  });
}

export function confirmOrder(id) {
  return axios.get(`${BASE_URL}/confirmOrder/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("jwtToken"),
    },
  });
}

export function updateUser(data) {
  return axios.put(`${BASE_URL}/updateUser`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("jwtToken"),
    },
  });
}

export function checkEmailforForgotPassword(email) {
  return axios.get(`${BASE_URL}/checkEmailIsRegisteredOrNot/${email}`);
}

export function changeForgotPassword(email, newpass) {
  return axios.post(`${BASE_URL}/forgotpassword/${email}/${newpass}`);
}
