import api from "../api/apiConfig";

export async function getSystemInfo() {
  const { data } = await api.get("/system/health");
  return data;
}
