// apiConfig.js

const LOCAL_SERVER = "http://127.0.0.1:8000";
const REMOTE_SERVER = "https://course-overflow.vercel.app";

// console.log(process.env);
const isDebug = false;

const baseURL = isDebug ? LOCAL_SERVER : REMOTE_SERVER;

export default baseURL;
