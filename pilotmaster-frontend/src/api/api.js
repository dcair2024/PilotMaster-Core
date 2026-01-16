import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5126/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // ⚠️ system/info NÃO exige auth
    if (token && !config.url?.includes("/system/info")) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
