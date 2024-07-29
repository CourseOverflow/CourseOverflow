import axios from "axios";

let accessToken = null;
let csrfToken = null;

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

const fetchAccessToken = async () => {
  const response = await api.post("auth/token/refresh/");
  accessToken = response.data.access;
  api.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
  console.log(accessToken);
};

const fetchCsrfToken = async () => {
  const response = await api.get("auth/token/csrf/");
  csrfToken = response.data.csrfToken;
  api.defaults.headers["X-CSRF-Token"] = csrfToken;
  console.log(csrfToken);
};

export const setTokens = async () => {
  await fetchCsrfToken();
  await fetchAccessToken();
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await setTokens();
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default api;
