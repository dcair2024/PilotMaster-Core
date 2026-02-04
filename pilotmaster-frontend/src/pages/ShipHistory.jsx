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
      setStatus("loading");

      try {
        const data = await ShipsService.getShipHistory(shipId);

        if (!data || data.length === 0) {
          setHistory([]);
          setStatus("empty");
        } else {
          setHistory(data);
          setStatus("success");
        }
      } catch (err) {
        // 🔑 CORREÇÃO PRINCIPAL:
        // 404 = histórico vazio, NÃO erro
        if (err.response?.status === 404) {
          setHistory([]);
          setStatus("empty");
        } else {
          setStatus("error");
        }
      }
    }

    if (shipId) {
      loadHistory();
    }
  }, [shipId]);

  return (
    <PageContainer title="Histórico do Navio">
      {status === "loading" && <p>Carregando histórico...</p>}
      {status === "error" && <p>Erro ao carregar histórico.</p>}
      {status === "empty" && <p>Nenhuma atividade registrada.</p>}

      {status === "success" && (
        <ul className="history-list">
          {history.map(item => (
            <TimelineEvent
              key={item.id}
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
