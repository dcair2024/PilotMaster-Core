import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ScheduleService from "../api/ScheduleService"; // ✅ IMPORTANTE: Serviço de Agendamento
import PageContainer from "../components/PageContainer";
import TimelineEvent from "../components/TimelineEvent";
import EmptyState from "../components/EmptyState";
import { MICROCOPY } from "../ui/microcopy";

export default function ScheduleHistory() {
  const { scheduleId } = useParams();
  const [status, setStatus] = useState("loading");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function loadHistory() {
      // ✅ CORREÇÃO B: Converter para número e validar
      const id = Number(scheduleId);

      if (isNaN(id) || !scheduleId || scheduleId === "undefined") {
        setStatus("error");
        return;
      }

      try {
        setStatus("loading");
        // ✅ Chama o serviço correto de Agendamento
        const data = await ScheduleService.getHistory(id);

        if (!data || data.length === 0) {
          setStatus("empty");
        } else {
          setHistory(data);
          setStatus("success");
        }
      } catch (err) {
        console.error("Erro na API de Histórico do Agendamento:", err);
        setStatus("error");
      }
    }
    loadHistory();
  }, [scheduleId]);

  return (
    <PageContainer title="Histórico do Agendamento">
      
{status === "loading" && <p>{MICROCOPY.loading.scheduleHistory}</p>}

{status === "empty" && (
  <EmptyState
    title={MICROCOPY.empty.scheduleHistory.title}
    subtitle={MICROCOPY.empty.scheduleHistory.subtitle}
  />
)}

{status === "error" && (
  <EmptyState
    title={MICROCOPY.error.invalidSchedule.title}
    subtitle={MICROCOPY.error.invalidSchedule.subtitle}
  />
)}


      {status === "success" && (
        <ul className="history-list">
          {history.map((item, index) => (
            <TimelineEvent
              key={item.id ?? `sch-hist-${index}`}
              action={item.action}
              description={item.description}
              date={new Date(item.createdAt).toLocaleString()}
            />
          ))}
        </ul>
      )}
    </PageContainer>
  );
}