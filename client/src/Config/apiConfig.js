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

const setCsrfToken = (token) => {
  csrfToken = token;
  api.defaults.headers["X-CSRF-Token"] = csrfToken;
};

export const setAccessToken = (token) => {
  accessToken = token;
  api.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
  const user = accessToken ? decodeJWT(accessToken) : null;
  localStorage.setItem("user", JSON.stringify(user));
};

const fetchCsrfToken = async () => {
  const response = await api.get("auth/token/csrf/");
  setCsrfToken(response.data.csrftoken);
};

const fetchAccessToken = async () => {
  const response = await api.post("auth/token/refresh/");
  setAccessToken(response.data.access);
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
  },
);

const decodeJWT = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join(""),
  );
  return JSON.parse(jsonPayload);
};

export const logoutUser = async () => {
  await api.post("auth/logout/");
  accessToken = null;
  delete api.defaults.headers["Authorization"];
  localStorage.removeItem("user");
};

export const getUserDetails = () => {
  const user = {
    email: "email@domain.com",
    first_name: "Guest",
    profilePicture: process.env.PUBLIC_URL + "/logo.png",
    isAuthenticated: false,
  };
  if (accessToken) {
    const userDetails = decodeJWT(accessToken);
    user.email = userDetails.email;
    user.first_name = userDetails.first_name;
    user.profilePicture = userDetails.profilePicture;
    user.isAuthenticated = true;
  }

  return user;
};

export default api;
