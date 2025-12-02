import { API_BASE_URL, getAuthHeaders } from "../config";

async function test() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Sem token");

  const url = `${API_BASE_URL}/tariff/calculate?Id=1&Name=test&GRT=100&Draft=5&Age=1&RequiresTug=false&Deficiency=0`;

  const res = await fetch(url, {
    headers: getAuthHeaders(token)
  });

  if (!res.ok) throw new Error("Erro ao testar tariff");

  return JSON.stringify(await res.json(), null, 2);
}

export default {
  test
};

