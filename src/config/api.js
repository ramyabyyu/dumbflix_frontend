import axios from "axios";

// create base url API
export const API = axios.create({
  baseURL:
    process.env.REACT_APP_BASEURL ||
    "https://dumbflix-backend.herokuapp.com/api/v1/",
  // baseURL: "http://localhost:8080/api/v1/",
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};
