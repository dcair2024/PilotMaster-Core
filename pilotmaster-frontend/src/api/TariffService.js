import api from "./api";

export async function calculateTariff(params) {
  const response = await api.get("/Tariff/calculate", {
    params: {
      id: params.id,
      name: params.name,
      grt: params.grt,
      draft: params.draft,
      age: params.age,
      requiresTug: params.requiresTug,
      deficiency: params.deficiency,
    },
  });

  return response.data;
}
