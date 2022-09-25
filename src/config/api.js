import axios from "axios";

// create base url API
export const API = axios.create({
  baseURL: REACT_APP_BASEURL,
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};
