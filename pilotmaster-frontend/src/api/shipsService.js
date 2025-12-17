import api from "./apiConfig";

export const getShips = async () => {
  const response = await api.get("/Ships");
  return response.data;
};
