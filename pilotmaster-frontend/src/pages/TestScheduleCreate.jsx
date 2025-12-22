import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScheduleService from "../api/ScheduleService";
import "../styles/ships.css";

export default function TestScheduleCreate() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    scheduledAt: "",
    area: "",
    shipId: "",
    status: "Scheduled",
    notes: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        scheduledAt: new Date(form.scheduledAt).toISOString(),
        area: form.area,
        shipId: Number(form.shipId),
        status: form.status,
        notes: form.notes
      };

      const res = await ScheduleService.create(payload);

      // ✅ FE-41 — mensagem REAL do backend
      setSuccess(res?.message || "Agendamento criado com sucesso.");

      // ⏳ feedback visual antes do redirect
      setTimeout(() => {
        navigate("/schedule");
      }, 600);

    } catch (err) {
      const apiMessage =
        err.response?.data?.message || "Erro inesperado. Tente novamente.";

      setError(apiMessage);
      console.error("API ERROR CODE:", err.response?.data?.code);

    } finally {
      setTimeout(() => {
        setSubmitting(false);
      }, 600);
    }
  }

  return (
    <div className="ships-page">
      <div className="ship-form-container">
        <h2>📅 Criar Schedule</h2>

        <form className="ship-form" onSubmit={handleSubmit}>

          <div className="form-field">
            <label>Data / Hora</label>
            <input
              type="datetime-local"
              name="scheduledAt"
              value={form.scheduledAt}
              onChange={handleChange}
              required
              disabled={submitting}
            />
          </div>

          <div className="form-field">
            <label>Área</label>
            <input
              type="text"
              name="area"
              value={form.area}
              onChange={handleChange}
              required
              disabled={submitting}
            />
          </div>

          <div className="form-field">
            <label>ID do Navio</label>
            <input
              type="number"
              name="shipId"
              value={form.shipId}
              onChange={handleChange}
              required
              disabled={submitting}
            />
          </div>

          <div className="form-field">
            <label>Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              disabled={submitting}
            >
              <option value="Scheduled">Scheduled</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="form-field">
            <label>Notas</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              disabled={submitting}
            />
          </div>

          {/* FEEDBACK */}
          {error && <div className="form-error">{error}</div>}
          {success && <div className="form-success">{success}</div>}

          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/schedule")}
              disabled={submitting}
            >
              Cancelar
            </button>

            <button className="btn-primary" disabled={submitting}>
              {submitting ? "Enviando..." : "Criar Schedule"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
