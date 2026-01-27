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
      // 🛡️ PROTEÇÃO: Se não houver ID ou se for a string "undefined", nem tenta chamar a API
      if (!shipId || shipId === "undefined") {
        setStatus("error");
        return;
      }

      try {
        setStatus("loading");
        const data = await ShipsService.getShipHistory(shipId);

        if (!data || data.length === 0) {
          setStatus("empty");
        } else {
          setHistory(data);
          setStatus("success");
        }
      } catch (err) {
        console.error("Erro ao buscar histórico:", err);
        setStatus("error");
      }
    }

    loadHistory();
  }, [shipId]); // Recarrega se o ID mudar

  return (
    <PageContainer title="Histórico do Navio">
      {status === "loading" && <p>Carregando histórico...</p>}
      
      {status === "error" && (
        <p style={{ color: "red" }}>
          Erro: ID do navio inválido ou problema na conexão.
        </p>
      )}
      
      {status === "empty" && <p>Nenhuma atividade registrada para este navio.</p>}

      {status === "success" && (
        <ul className="history-list">
          {history.map((item, index) => (
            <TimelineEvent
              // Usando uma chave composta para garantir unicidade
              key={`${item.id || index}-${item.createdAt}`}
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