import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShipsService from "../api/shipsService";
import PageContainer from "../components/PageContainer";
import TimelineEvent from "../components/TimelineEvent";

export default function ShipHistory() {
  const { shipId } = useParams();

  const [status, setStatus] = useState("loading");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function loadHistory() {
      try {
        const data = await ShipsService.getShipHistory(shipId);

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
  }, [shipId]);

  return (
    <PageContainer title="Histórico do Navio">
      {status === "loading" && <p>Carregando histórico...</p>}
      {status === "error" && <p>Erro ao carregar histórico.</p>}
      {status === "empty" && <p>Nenhuma atividade registrada.</p>}

      {status === "success" && (
        <ul className="history-list">
          {history.map((item, index) => (
            <TimelineEvent
              key={`${item.id}-${item.createdAt}-${index}`}
              action={item.action}
              description={`Schedule #${item.scheduleId} — ${item.description}`}
              date={new Date(item.createdAt).toLocaleString()}
            />
          ))}
        </ul>
      )}
    </PageContainer>
  );
}

