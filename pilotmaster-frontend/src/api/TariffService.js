import { API_BASE_URL, getAuthHeaders } from "../config";

/**
 * Realiza o cálculo da tarifa com base nos parâmetros da embarcação.
 */
export async function calculateTariff(params) {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Usuário não autenticado. Faça login para calcular tarifas.");
    }

    const sanitizedParams = {
        Id: params.Id,
        Name: params.Name,
        GRT: Number(params.GRT),
        Draft: Number(params.Draft),
        Age: Number(params.Age),
        RequiresTug: params.RequiresTug ? "true" : "false",
        Deficiency: Number(params.Deficiency)   // 0 ou 1
    };

    // Remove NaN, null, undefined
    Object.keys(sanitizedParams).forEach(key => {
        if (sanitizedParams[key] === null || sanitizedParams[key] === undefined || Number.isNaN(sanitizedParams[key])) {
            delete sanitizedParams[key];
        }
    });

    const queryParams = new URLSearchParams(sanitizedParams).toString();
    const url = `${API_BASE_URL}/Tariff/calculate?${queryParams}`;

    const response = await fetch(url, {
        method: "GET",
        headers: getAuthHeaders(token),
    });

    if (!response.ok) {
        let errorMessage = "Falha ao calcular tarifa. Verifique os parâmetros.";
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch {}
        throw new Error(errorMessage);
    }

    return await response.json();
}
