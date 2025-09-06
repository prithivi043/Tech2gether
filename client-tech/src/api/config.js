// src/api/config.js
const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api"
    : "https://tech2gether-server.vercel.app/api";

export default API_BASE_URL;
