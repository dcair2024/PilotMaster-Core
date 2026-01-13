import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ScheduleService from "../api/ScheduleService";

export default function ScheduleHistory() {
  const { scheduleId } = useParams();

  const [status, setStatus] = useState("loading");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function loadHistory() {
      try {
        setStatus("loading");

        const data = await ScheduleService.getHistory(scheduleId);

        if (!data || data.length === 0) {
          setStatus("empty");
        } else {
          setHistory(data);
          setStatus("success");
        }
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    }

    loadHistory();
  }, [scheduleId]);

  return (
    <div className="page-container">
      <h2>Histórico do Schedule #{scheduleId}</h2>

      {status === "loading" && <p>Carregando histórico...</p>}
      {status === "empty" && <p>Nenhum histórico disponível.</p>}
      {status === "error" && <p>Erro ao carregar histórico.</p>}

      {status === "success" && (
        <ul className="history-list">
          {history.map(item => (
            <li key={item.id} className="card history-item">
              <div className="history-action">
                {item.action}
              </div>

              <div className="history-description">
                {item.description}
              </div>

              <div className="history-date">
                {new Date(item.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
