import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShipsService from "../api/shipsService";

export default function ShipHistory() {
  const { shipId } = useParams();
  const [status, setStatus] = useState("loading");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function loadHistory() {
      try {
        setStatus("loading");
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
    <div className="page-container">
      <h2>Histórico do Navio #{shipId}</h2>

      {status === "loading" && <p>Carregando histórico...</p>}
      {status === "error" && <p>Erro ao carregar histórico.</p>}
      {status === "empty" && <p>Nenhum histórico disponível.</p>}

      {status === "success" && (
  <ul style={{ listStyle: "none", padding: 0, marginTop: 16 }}>
    {history.map((item, index) => (
      <li
        key={index}
        className="card"
        style={{ marginBottom: 12 }}
      >
        <div style={{ fontWeight: 600, marginBottom: 4 }}>
          {item.action}
        </div>

        <div style={{ fontSize: 14, color: "#334155" }}>
          Schedule #{item.scheduleId} — {item.description}
        </div>

        <div style={{ fontSize: 12, color: "#64748b", marginTop: 6 }}>
          {new Date(item.createdAt).toLocaleString()}
        </div>
      </li>
    ))}
  </ul>
)}

    </div>
  );
}
