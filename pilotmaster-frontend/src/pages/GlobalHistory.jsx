import { useEffect, useState } from "react";
import api from "../api/api";
import PageContainer from "../components/PageContainer";
import TimelineEvent from "../components/TimelineEvent";


export default function GlobalHistory() {
  const [status, setStatus] = useState("loading");
  // loading | empty | error | success
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
      } catch (err) {
        console.error("Erro ao carregar histórico global", err);
        setStatus("error");
      }
    }

    loadHistory();
  }, []);

  if (status === "loading") {
    return <p>Carregando histórico...</p>;
  }

  if (status === "error") {
    return <p>Erro ao carregar histórico.</p>;
  }

  if (status === "empty") {
    return <p>Nenhuma atividade registrada.</p>;
  }

  return (
    <PageContainer title="Histórico Global">
    <ul className="history-list">
  {items.map(item => (
    <TimelineEvent
      key={item.id}
      action={item.action}
      description={item.description}
      date={new Date(item.createdAt).toLocaleString()}
    />
  ))}
</ul>
  </PageContainer>
  );
}
