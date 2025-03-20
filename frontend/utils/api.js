import axios from "axios";

const API = axios.create({
  baseURL: "https://coupons-system-3seu.onrender.com/api",
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
