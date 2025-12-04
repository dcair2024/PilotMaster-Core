import React, { useEffect, useState } from "react";
import ScheduleService from "../api/ScheduleService";

export default function TestSchedulePage() {
    const [loading, setLoading] = useState(true);
    const [schedules, setSchedules] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
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

        loadData();
    }, []);

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <h2>📅 Testar Listagem de Schedules (FE-04)</h2>
            <p>Esta página testa o endpoint GET /api/Schedule</p>

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
                            <li key={s.id} style={{ marginBottom: "10px" }}>
                                <strong>ID:</strong> {s.id} <br />
                                <strong>Navio:</strong> {s.shipName} <br />
                                <strong>Data:</strong> {s.date || "—"} <br />
                                <strong>Status:</strong> {s.status || "—"}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
