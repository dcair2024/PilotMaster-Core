import React, { useState } from "react";
import ScheduleService from "../api/ScheduleService";

export default function TestScheduleCreate() {

    const [form, setForm] = useState({
        scheduledAt: "",
        area: "",
        shipId: "",
        status: "Scheduled",
        notes: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        try {

            const payload = {
                scheduledAt: new Date(form.scheduledAt).toISOString(),
                area: form.area,
                shipId: Number(form.shipId),
                status: form.status,
                notes: form.notes
            };

            const created = await ScheduleService.create(payload);
            setResult(created);

        } catch (err) {
            console.error("Erro ao criar schedule:", err);
            setError(err.message || "Erro ao criar schedule");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "auto", padding: 20 }}>
            
            <h2>📅 Criar Schedule (FE-05)</h2>
            <p>Testando o endpoint POST /api/Schedule</p>

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>

                <label>Data / Hora:</label>
                <input 
                    type="datetime-local"
                    name="scheduledAt"
                    value={form.scheduledAt}
                    onChange={handleChange}
                    required
                />

                <label>Área:</label>
                <input
                    type="text"
                    name="area"
                    value={form.area}
                    onChange={handleChange}
                    required
                />

                <label>ID do Navio (shipId):</label>
                <input
                    type="number"
                    name="shipId"
                    value={form.shipId}
                    onChange={handleChange}
                    required
                />

                <label>Status:</label>
                <select name="status" value={form.status} onChange={handleChange}>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Completed">Completed</option>
                </select>

                <label>Notas:</label>
                <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                />

                <button type="submit" disabled={loading} style={{ marginTop: 12 }}>
                    {loading ? "Enviando..." : "Criar Schedule"}
                </button>
            </form>

            {error && <p style={{ color: "red" }}>⚠️ {error}</p>}

            {result && (
                <div style={{ marginTop: 20, padding: 15, border: "1px solid #ccc" }}>
                    <h3>✅ Schedule Criado</h3>
                    <p><strong>ID:</strong> {result.id}</p>
                    <p><strong>Área:</strong> {result.area}</p>
                    <p><strong>Data:</strong> {result.scheduledAt}</p>
                </div>
            )}
        </div>
    );
}
