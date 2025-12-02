import { API_BASE_URL, getAuthHeaders } from "../config";

async function getAll() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Sem token");

  const res = await fetch(`${API_BASE_URL}/schedule`, {
    headers: getAuthHeaders(token)
  });

  if (!res.ok) throw new Error("Erro ao buscar schedules");

  return await res.json();
}

export default {
  getAll
};
