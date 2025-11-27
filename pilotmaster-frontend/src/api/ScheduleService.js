import { API_BASE_URL, getDefaultHeaders, getAuthHeaders } from "./api.config";
import AuthService from "./AuthService";

const SCHEDULE_URL = `${API_BASE_URL}/schedule`;

export const ScheduleService = {
  async getAll() {
    const res = await fetch(SCHEDULE_URL, {
      method: "GET",
      headers: getDefaultHeaders()
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.message || `Erro listar (${res.status})`);
    }
    return await res.json();
  },

  async create(data) {
    const token = AuthService.getToken();
    if (!token) throw new Error("Login necessário");
    const res = await fetch(SCHEDULE_URL, {
      method: "POST",
      headers: getAuthHeaders(token),
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.message || `Erro criar (${res.status})`);
    }
    return await res.json();
  },

  async cancel(id) {
    const token = AuthService.getToken();
    if (!token) throw new Error("Login necessário");
    const res = await fetch(`${SCHEDULE_URL}/${id}/cancel`, {
      method: "PUT",
      headers: getAuthHeaders(token)
    });
    if (res.status === 204) return;
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.message || `Erro cancelar (${res.status})`);
    }
    return await res.json();
  }
};

export default ScheduleService;
