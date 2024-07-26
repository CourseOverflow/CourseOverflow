import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const access_token = localStorage.getItem("access");
  if (access_token) {
    config.headers.Authorization = `JWT ${access_token}`;
  }
  return config;
});

export default api;
