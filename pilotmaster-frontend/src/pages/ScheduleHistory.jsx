import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ScheduleHistory() {
  const { scheduleId } = useParams();

  const [status, setStatus] = useState("loading");
  // loading | empty | error | success

  const mockHistory = [
    {
      id: 1,
      type: "CREATED",
      description: "Schedule criado",
      createdAt: "2026-01-07T10:30:00"
    },
    {
      id: 2,
      type: "CANCELLED",
      description: "Schedule cancelado",
      createdAt: "2026-01-07T11:15:00"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus(mockHistory.length ? "success" : "empty");
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="page-container">
      <h2>Histórico do Schedule #{scheduleId}</h2>

      {status === "loading" && <p>Carregando histórico...</p>}

      {status === "empty" && <p>Nenhum histórico disponível.</p>}

      {status === "error" && <p>Erro ao carregar histórico.</p>}

      {status === "success" && (
        <ul style={{ marginTop: 16 }}>
          {mockHistory.map(item => (
            <li key={item.id} style={{ marginBottom: 12 }}>
              <strong>{item.type}</strong> — {item.description}
              <br />
              <small>{new Date(item.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

