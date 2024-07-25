const { createProxyMiddleware } = require("http-proxy-middleware");

// const DEBUG = process.env.DEBUG === "true";

// const baseURL = DEBUG ? process.env.LOCAL_SERVER : process.env.REMOTE_SERVER;

const baseURL = "http://localhost:8000/api/";

module.exports = function (app) {
  app.use(
    "/api", // Prefix for requests to be proxied
    createProxyMiddleware({
      target: baseURL, // Target backend server URL
      changeOrigin: true, // Required for CORS
    }),
  );
};
