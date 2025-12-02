import { API_BASE_URL, getDefaultHeaders } from "../config";

// LOGIN
export async function login(username, password) {
  const response = await fetch(`${API_BASE_URL}/Auth/login`, {
    method: "POST",
    headers: getDefaultHeaders(),
    body: JSON.stringify({ username, password })
  });

  if (!response.ok) {
    throw new Error("Credenciais inválidas.");
  }

  return await response.json(); // { token, refreshToken }
}

// REFRESH
export async function refreshToken(refreshToken, token) {
  const response = await fetch(`${API_BASE_URL}/Auth/refresh`, {
    method: "POST",
    headers: {
      ...getDefaultHeaders(),
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ refreshToken })
  });

  if (!response.ok) {
    throw new Error("Falha ao renovar token.");
  }

  return await response.json();
}






