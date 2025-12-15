import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:7041/api", // backend ASP.NET
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
