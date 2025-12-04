import { API_BASE_URL, getAuthHeaders } from "../config";

async function getAll() {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Sem token");

    const res = await fetch(`${API_BASE_URL}/schedule`, {
        method: "GET",
        headers: getAuthHeaders(token)
    });

    if (!res.ok) throw new Error("Erro ao buscar schedules");

    return await res.json();
}

async function create(payload) {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Sem token");

    const res = await fetch(`${API_BASE_URL}/schedule`, {
        method: "POST",
        headers: {
            ...getAuthHeaders(token),
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    if (!res.ok) {
        let msg = "Erro ao criar schedule";
        try {
            const err = await res.json();
            msg = err.message || msg;
        } catch {}
        throw new Error(msg);
    }

    return await res.json();
}

export default {
    getAll,
    create
};
