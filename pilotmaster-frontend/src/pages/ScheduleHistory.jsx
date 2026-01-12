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
  <ul style={{ marginTop: 24, padding: 0, listStyle: "none" }}>
    {history.map(item => (
      <li
        key={item.id}
        style={{
          padding: "12px 16px",
          marginBottom: 12,
          borderRadius: 6,
          background: "#f9f9f9",
          border: "1px solid #e0e0e0"
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: 4 }}>
          {item.action}
        </div>

        <div style={{ fontSize: 14, color: "#555", marginBottom: 6 }}>
          {item.description}
        </div>

        <div style={{ fontSize: 12, color: "#888" }}>
          {new Date(item.createdAt).toLocaleString()}
        </div>
      </li>
    ))}
  </ul>
)}

    </div>
  );
}

