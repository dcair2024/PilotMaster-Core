import api from "./api";

const HistoryService = {
  async getGlobalHistory() {
    const response = await api.get("/history");
    return response.data;
  },
};

export default HistoryService;
