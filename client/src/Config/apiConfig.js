import axios from "axios";

const DEBUG = process.env.DEBUG === "true";

const baseURL = DEBUG
  ? "http://localhost:8000/api/"
  : process.env.REMOTE_SERVER;

const api = axios.create({
  baseURL: baseURL,
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
