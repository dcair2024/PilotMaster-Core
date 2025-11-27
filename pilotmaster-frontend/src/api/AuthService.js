import { API_BASE_URL, getDefaultHeaders } from "../config";

export async function login(username, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: getDefaultHeaders(),
    body: JSON.stringify({ username, password })
  });

  if (!response.ok) {
    throw new Error("Credenciais inválidas.");
  }

  return await response.json(); // retorna { token }
}


