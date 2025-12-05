import React, { useEffect, useState } from "react";
import ScheduleService from "../api/ScheduleService";

export default function TestSchedulePage() {
    const [loading, setLoading] = useState(true);
    const [schedules, setSchedules] = useState([]);
    const [error, setError] = useState(null);

    // ============================
    // Função para carregar os dados (assim pode ser chamada após cancelar)
    // ============================
    async function loadData() {
        setLoading(true);
        setError(null);

        try {
            const data = await ScheduleService.getAll();
            setSchedules(data);
        } catch (err) {
            console.error("Erro ao carregar schedules:", err);
            setError(err.message || "Erro desconhecido ao carregar schedules.");
        } finally {
            setLoading(false);
        }
    }

    // ============================
    // Carrega quando a página inicia
    // ============================
    useEffect(() => {
        loadData();
    }, []);

    // ============================
    // FUNÇÃO DE CANCELAMENTO
    // ============================
    async function handleCancel(id) {
        const ok = window.confirm(`Deseja realmente cancelar o schedule #${id}?`);
        if (!ok) return;

        try {
            await ScheduleService.cancel(id);
            alert(`Schedule #${id} cancelado com sucesso!`);
            loadData(); // recarrega a lista após cancelar
        } catch (err) {
            console.error("Erro ao cancelar schedule:", err);
            alert("Erro ao cancelar schedule.");
        }
    }

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <h2>📅 Testar Listagem de Schedules (FE-04 + FE-06)</h2>
            <p>Testando GET /api/Schedule e PUT /api/Schedule/{`{id}`}/cancel</p>

            {loading && <p>Carregando agendamentos...</p>}

            {error && (
                <p style={{ color: "red" }}>
                    ⚠️ Erro: {error}
                </p>
            )}

            {!loading && !error && schedules.length === 0 && (
                <p>Nenhum agendamento encontrado.</p>
            )}

            {!loading && schedules.length > 0 && (
                <div
                    style={{
                        marginTop: "20px",
                        border: "1px solid #ccc",
                        padding: "15px",
                        backgroundColor: "#f9f9f9",
                    }}
                >
                    <h3>📋 Schedules encontrados:</h3>
                    <ul>
                        {schedules.map((s) => (
                            <li key={s.id} style={{ marginBottom: "12px" }}>
                                <strong>ID:</strong> {s.id} <br />
                                <strong>Navio:</strong> {s.shipName || "—"} <br />
                                <strong>Data:</strong> {s.date || "—"} <br />
                                <strong>Status:</strong> {s.status || "—"}
                                <br />

                                {/* Botão só aparece se ainda não estiver cancelado */}
                                {s.status !== "Cancelled" && (
                                    <button
                                        style={{
                                            marginTop: 6,
                                            background: "#d9534f",
                                            color: "white",
                                            border: "none",
                                            padding: "6px 12px",
                                            cursor: "pointer",
                                            borderRadius: 4,
                                        }}
                                        onClick={() => handleCancel(s.id)}
                                    >
                                        Cancelar
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
