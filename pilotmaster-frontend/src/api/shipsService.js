import api from "./apiConfig";


export const getShips = async () => {
  const response = await api.get("/Ships");
  return response.data;
};

export const createShip = async (ship) => {
  const response = await api.post("/Ships", ship);
  return response.data;
};

async function getShipHistory(shipId) {
  const res = await api.get(`/Ships/${shipId}/history`);
  return res.data;
}
export default {
  
  getShipHistory
};


