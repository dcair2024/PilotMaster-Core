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

      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {status === "loading" && <p>Carregando relatório...</p>}
      {status === "error" && <p>Erro ao carregar relatório.</p>}
      {status === "empty" && <p>Nenhum dado encontrado.</p>}

      {status === "success" && report && (
        <ul>
          <li>Total de Schedules: {report.totalSchedules}</li>
          <li>Cancelados: {report.totalCancelled}</li>
          <li>Ativos: {report.totalActive}</li>
          <li>Concluídos: {report.totalCompleted}</li>
        </ul>
      )}
    </div>
  );
}
