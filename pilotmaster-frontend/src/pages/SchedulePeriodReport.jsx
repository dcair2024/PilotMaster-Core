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
  <div style={{ 
    display: "flex", 
    gap: 16, 
    alignItems: "flex-end", // 🟢 Alinha tudo pela base (resolve o desalinhamento do botão)
    flexWrap: "wrap"        // 🟢 Garante que quebre linha em telas menores
  }}>
    
    <div className="form-field" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label className="ds-label">Data inicial</label>
      <input
        type="date"
        className="ds-input"
        style={{ width: "160px" }} // 🟢 Largura consistente
        value={startDate}
        onChange={e => setStartDate(e.target.value)}
      />
    </div>

    <div className="form-field" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label className="ds-label">Data final</label>
      <input
        type="date"
        className="ds-input"
        style={{ width: "160px" }} // 🟢 Largura consistente
        value={endDate}
        onChange={e => setEndDate(e.target.value)}
      />
    </div>

    <div className="form-field">
      {/* 🟢 Removida a label com &nbsp; para evitar espaços fantasmas */}
      <button
        className="btn-primary"
        onClick={handleSearch}
        style={{
          height: "40px",      // Ajuste para bater com a altura real do seu ds-input
          padding: "0 24px",   // Padding lateral para o botão respirar
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        Buscar
      </button>
    </div>

  </div>
</div>

      {/* Estados */}
      {status === "loading" && <p>Carregando relatório...</p>}
      {status === "error" && <p>Erro ao carregar relatório.</p>}
      {status === "empty" && <p>Nenhum dado encontrado.</p>}

      {/* Resultado */}
      {status === "success" && report && (
        <div className="card">
          <div className="report-summary">
            <div className="report-total-label">
              Total de schedules
            </div>
            <div className="report-total-value">
              {report.totalSchedules}
            </div>
          </div>

          <ul className="report-breakdown">
            <li>Ativos: {report.totalActive}</li>
            <li>Cancelados: {report.totalCancelled}</li>
            <li>Concluídos: {report.totalCompleted}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
