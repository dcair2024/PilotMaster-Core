import { API_BASE_URL, getDefaultHeaders, getAuthHeaders } from "./api.config";
import AuthService from "./AuthService";

const TARIFF_URL = `${API_BASE_URL}/tariff`;

export const TariffService = {
  async test() {
    const res = await fetch(`${TARIFF_URL}/test`, {
      method: "GET",
      headers: getDefaultHeaders()
    });
    if (!res.ok) {
      throw new Error("Erro no tariff test");
    }
    return await res.text();
  },

  // exemplo de método protegido
  async getAll() {
    const token = AuthService.getToken();
    if (!token) throw new Error("Login necessário");
    const res = await fetch(TARIFF_URL, {
      method: "GET",
      headers: getAuthHeaders(token)
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.message || `Erro tariff (${res.status})`);
    }
    return await res.json();
  }
};

export default TariffService;
