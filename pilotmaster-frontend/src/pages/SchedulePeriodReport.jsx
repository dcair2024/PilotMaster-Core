import { useState } from "react";
import ScheduleService from "../api/ScheduleService";

export default function SchedulePeriodReport() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("idle");
  const [report, setReport] = useState(null);

  async function handleSearch() {
    try {
      setStatus("loading");
      setReport(null);

      const data = await ScheduleService.getReportByPeriod(
        startDate,
        endDate
      );

      if (!data || data.totalSchedules === 0) {
        setStatus("empty");
      } else {
        setReport(data);
        setStatus("success");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
  <div className="page-container">
    <h2>Relatório de Schedules por Período</h2>

    {/* Filtros */}
    <div className="card" style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
        <div className="form-field">
          <label className="ds-label">Data inicial</label>
          <input
            type="date"
            className="ds-input"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label className="ds-label">Data final</label>
          <input
            type="date"
            className="ds-input"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
          />
        </div>

        <button className="btn-primary" onClick={handleSearch}>
          Buscar
        </button>
      </div>
    </div>

    {/* Estados */}
    {status === "loading" && <p>Carregando relatório...</p>}
    {status === "error" && <p>Erro ao carregar relatório.</p>}
    {status === "empty" && <p>Nenhum dado encontrado.</p>}

    {/* Resultado */}
    {status === "success" && report && (
      <div className="card">
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: "#64748b" }}>
            TOTAL DE SCHEDULES
          </div>
          <div style={{ fontSize: 32, fontWeight: 700 }}>
            {report.totalSchedules}
          </div>
        </div>

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li>Ativos: {report.totalActive}</li>
          <li>Cancelados: {report.totalCancelled}</li>
          <li>Concluídos: {report.totalCompleted}</li>
        </ul>
      </div>
    )}
  </div>
);
}