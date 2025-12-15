import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7041/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor: injeta token automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
