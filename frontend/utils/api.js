import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,  
});

// ✅ Ensure Token Is Sent With Every Request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;  // ✅ Correct Format
  }
  return config;
});

export default API;
