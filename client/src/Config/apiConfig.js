import axios from "axios";

const DEBUG = false;
const LOCAL_SERVER = "http://127.0.0.1:8000/api/";
const REMOTE_SERVER = "https://course-overflow.vercel.app/api/";
const baseURL = DEBUG ? LOCAL_SERVER : REMOTE_SERVER;

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
