import { useState } from "react";
import ScheduleService from "../api/ScheduleService";
import PageContainer from "../components/PageContainer";
import EmptyState from "../components/EmptyState";


export default function SchedulePeriodReport() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("idle");
  const [report, setReport] = useState(null);

  async function handleSearch() {
    try {
      setStatus("loading");
      setReport(null);

      const data = await ScheduleService.getReportByPeriod(startDate, endDate);

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
    <PageContainer title="Relatório de Schedules por Período">
      <div className="card pm-filters">
        <div className="pm-filter-group">

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

          <div className="form-field pm-filter-button">
            <button className="btn-primary" onClick={handleSearch}>
              Buscar
            </button>
          </div>

        </div>
      </div>

      {status === "loading" && <p>Carregando relatório...</p>}
      {status === "empty" && (
  <EmptyState
    title="Nenhum dado encontrado"
    subtitle="Não há schedules no período selecionado."
  />
)}

{status === "error" && (
  <EmptyState
    title="Erro ao gerar relatório"
    subtitle="Tente novamente mais tarde."
  />
)}


      {status === "success" && report && (
        <div className="card">
          <div className="report-summary">
            <div className="report-total-label">Total de schedules</div>
            <div className="report-total-value">{report.totalSchedules}</div>
          </div>

          <ul className="report-breakdown">
            <li>Ativos: {report.totalActive}</li>
            <li>Cancelados: {report.totalCancelled}</li>
            <li>Concluídos: {report.totalCompleted}</li>
          </ul>
        </div>
      )}
    </PageContainer>
  );
}
  