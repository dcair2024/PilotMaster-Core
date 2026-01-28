import api from "./api";

const ShipsService = {
  getShips: async () => {
    const response = await api.get("/ships");
    return response.data;
  },

  getShipHistory: async (shipId) => {
    const response = await api.get(`/ships/${shipId}/history`);
    return response.data;
  }
};

export default ShipsService;



