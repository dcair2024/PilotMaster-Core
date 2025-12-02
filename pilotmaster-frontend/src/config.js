// Base URL do backend
export const API_BASE_URL = "https://localhost:7041/api";

// Cabeçalhos sem token
export function getDefaultHeaders() {
  return {
    "Content-Type": "application/json"
  };
}

// Cabeçalhos com token
export function getAuthHeaders(token) {
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
}
