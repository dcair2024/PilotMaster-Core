export const API_BASE_URL = "https://localhost:7041/api";

export const getDefaultHeaders = () => ({
  "Content-Type": "application/json"
});

export const getAuthHeaders = (token) => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token}`
});
