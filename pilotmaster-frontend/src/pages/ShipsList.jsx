import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ShipsService from "../api/shipsService";
import HistoryService from "../api/historyService";
import PageContainer from "../components/PageContainer";
import "../styles/cards.css";


export default function ShipsList() {
  const [ships, setShips] = useState([]);
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const [allShips, history] = await Promise.all([
          ShipsService.getShips(),
          HistoryService.getGlobalHistory(),
        ]);

        // 🔑 IDs de navios que possuem histórico
        const shipsWithHistory = new Set(
          history.map(item => item.shipId)
        );

        // 🔥 OPÇÃO A: só navios com histórico
        const filteredShips = allShips.filter(
          ship => shipsWithHistory.has(ship.id)
        );

        setShips(filteredShips);
        setStatus(filteredShips.length ? "success" : "empty");
      } catch {
        setStatus("error");
      }
    }

    load();
  }, []);

  return (
    <PageContainer title="Navios">
      {/* HEADER */}
      <div className="page-header">
        <span />
        <Link to="/ships/new" className="btn-primary">
          + Novo Navio
        </Link>
      </div>

      {status === "loading" && <p>Carregando navios...</p>}
      {status === "error" && <p>Erro ao carregar navios.</p>}
      {status === "empty" && (
        <p>Nenhum navio com histórico operacional.</p>
      )}

      {status === "success" && (
        <div className="cards-grid">
          {ships.map(ship => (
            <div
              key={ship.id}
              className="ship-card"
              onClick={() => navigate(`/ships/${ship.id}/history`)}
            >
              <h3>{ship.name}</h3>

              <div className="card-actions">
                <span className="btn-primary">Ver histórico</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
