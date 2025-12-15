// src/api/AuthService.js
import api from "./apiConfig";

export async function login(username, password) {
  const res = await api.post("/Auth/login", {
    username,
    password,
  });

  const { token, refreshToken } = res.data;

  localStorage.setItem("token", token);
  localStorage.setItem("refreshToken", refreshToken);

  return res.data;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
}
