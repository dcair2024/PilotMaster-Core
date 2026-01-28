import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ShipsService from "../api/shipsService";
import PageContainer from "../components/PageContainer";
import TimelineEvent from "../components/TimelineEvent";
import EmptyState from "../components/EmptyState";

export default function ShipHistory() {
  
  const { shipId } = useParams();
  if (!shipId || shipId === "undefined") {
  return null;
}

  const [status, setStatus] = useState("loading");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function loadHistory() {
      const id = Number(shipId);

      if (isNaN(id)) {
        setStatus("error");
        return;
      }

      try {
        setStatus("loading");
        const data = await ShipsService.getShipHistory(id);

        if (!data || data.length === 0) {
          setStatus("empty");
        } else {
          setHistory(data);
          setStatus("success");
        }
      } catch (err) {
        console.error("Erro na API de Histórico do Navio:", err);
        setStatus("error");
      }
    }

    loadHistory();
  }, [shipId]);

  return (
    <PageContainer title="Histórico do Navio">
      {status === "loading" && <p>Carregando histórico do navio...</p>}

      {status === "empty" && (
        <EmptyState
          title="Nenhum histórico encontrado"
          subtitle="Este navio ainda não possui atividades registradas."
        />
      )}

      {status === "error" && (
        <EmptyState
          title="Erro ao carregar histórico"
          subtitle="O ID do navio é inválido ou não foi encontrado."
        />
      )}

      {status === "success" && (
        <ul className="history-list">
          {history.map((item, index) => (
            <TimelineEvent
              key={item.id ?? `ship-hist-${index}`}
              action={item.action}
              description={
                <Link to={`/schedule/${item.scheduleId}/history`}>
                  Schedule #{item.scheduleId} — {item.description}
                </Link>
              }
              date={new Date(item.createdAt).toLocaleString()}
            />
          ))}
        </ul>
      )}
    </PageContainer>
  );
}
