import { useEffect, useState } from "react";
import api from "../api/api";

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
    <div className="page-container">
      <h1>Histórico Global</h1>

      <ul className="history-list">
        {items.map((item, index) => (
          <li
            key={`${item.scheduleId ?? "global"}-${item.createdAt}-${index}`}
            className="history-item"
          >
            <div className="card">
              {/* Ação */}
              <div className="history-action">
                {item.action}
              </div>

              {/* Contexto + descrição */}
              <div className="history-description">
                {item.shipName}
                {item.scheduleId && (
                  <> — Schedule #{item.scheduleId}</>
                )}
                <br />
                {item.description}
              </div>

              {/* Data */}
              <div className="history-date">
                {new Date(item.createdAt).toLocaleString()}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
