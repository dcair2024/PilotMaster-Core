import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ShipsService from "../api/shipsService";
import PageContainer from "../components/PageContainer";
import "../styles/cards.css";

export default function ShipsList() {
  const [ships, setShips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const data = await ShipsService.getShips();
      setShips(data);
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

      {/* GRID */}
      <div className="cards-grid">
        {ships.map(ship => (
          <div
            key={ship.id}
            className="ship-card"
            onClick={() => navigate(`/ships/${ship.id}/history`)}
          >
            <h3>{ship.name}</h3>
            <p>Status: {ship.active ? "Ativo" : "Inativo"}</p>

            <div className="card-actions">
              <span className="btn-primary">Ver histórico</span>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

