const { createProxyMiddleware } = require("http-proxy-middleware");

const DEBUG = process.env.DEBUG === "true";

const baseURL = !DEBUG
  ? "http://localhost:8000/api/"
  : process.env.REMOTE_SERVER;

module.exports = function (app) {
  app.use(
    "/api", // Prefix for requests to be proxied
    createProxyMiddleware({
      target: baseURL, // Target backend server URL
      changeOrigin: true, // Required for CORS
    }),
  );
};
