import { useEffect, useState } from "react";
import api from "../api/api";
import PageContainer from "../components/PageContainer";
import TimelineEvent from "../components/TimelineEvent";

export default function GlobalHistory() {
  const [status, setStatus] = useState("loading");
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function loadHistory() {
      try {
        const response = await api.get("/history");

        if (!response.data || response.data.length === 0) {
          setStatus("empty");
          return;
        }

        setItems(response.data);
        setStatus("success");
      } catch {
        setStatus("error");
      }
    }

    loadHistory();
  }, []);

  return (
    <PageContainer title="Histórico Global">
      {status === "loading" && <p>Carregando histórico...</p>}
      {status === "error" && <p>Erro ao carregar histórico.</p>}
      {status === "empty" && <p>Nenhuma atividade registrada.</p>}

      {status === "success" && (
        <ul className="history-list">
          {items.map((item, index) => (
            <TimelineEvent
              key={`${item.id}-${item.createdAt}-${index}`}
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
