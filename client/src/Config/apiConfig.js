// apiConfig.js

const LOCAL_SERVER = "http://127.0.0.1:8000";
const REMOTE_SERVER = "https://server.courseoverflow";

// console.log(process.env);
const isDebug = true;

const baseURL = isDebug ? LOCAL_SERVER : REMOTE_SERVER;

export default baseURL;
