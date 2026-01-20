import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ScheduleService from "../api/ScheduleService";
import PageContainer from "../components/PageContainer";
import TimelineEvent from "../components/TimelineEvent";
import "../styles/history.css";

export default function ScheduleHistory() {
  const { scheduleId } = useParams();
  const [status, setStatus] = useState("loading");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function loadHistory() {
      try {
        const data = await ScheduleService.getHistory(scheduleId);

        if (!data || data.length === 0) {
          setStatus("empty");
        } else {
          setHistory(data);
          setStatus("success");
        }
      } catch {
        setStatus("error");
      }
    }

    loadHistory();
  }, [scheduleId]);

  return (
    <PageContainer title="Histórico do Schedule">
      {status === "loading" && <p>Carregando histórico...</p>}
      {status === "error" && <p>Erro ao carregar histórico.</p>}
      {status === "empty" && <p>Nenhuma atividade registrada.</p>}

      {status === "success" && (
        <ul className="history-list">
          {history.map(item => (
            <TimelineEvent
              key={item.id}
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
