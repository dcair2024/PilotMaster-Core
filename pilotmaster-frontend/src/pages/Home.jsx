// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { API_BASE_URL, getAuthHeaders } from "../config";

export default function Home() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadDashboard() {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`${API_BASE_URL}/dashboard`, {
                    headers: getAuthHeaders(token)
                });

                if (!res.ok) throw new Error("Falha ao carregar dashboard");

                const body = await res.json();
                setData(body);
            } catch (err) {
                setError(err.message || "Erro desconhecido");
            } finally {
                setLoading(false);
            }
        }

        loadDashboard();
    }, []);

    if (loading) return <p style={{ padding: 20 }}>Carregando Dashboard...</p>;
    if (error) return <p style={{ padding: 20, color: "red" }}>⚠️ {error}</p>;

    return (
        <div style={{ padding: 20 }}>
            <h2>🏠 Dashboard do Sistema</h2>

            <p><strong>Manobras Recentes:</strong> {data.recentSchedules}</p>
            <p><strong>Total de Navios:</strong> {data.totalShips}</p>
            <p><strong>Manobras Pendentes:</strong> {data.pendingSchedules}</p>

            <div style={{ marginTop: 20 }}>
                <h3>🛳️ Último Cálculo de Tarifa</h3>
                <p><strong>Navio:</strong> {data.lastTariffCalc?.ship}</p>
                <p><strong>Valor Final:</strong> R$ {data.lastTariffCalc?.final}</p>
            </div>
        </div>
    );
}
