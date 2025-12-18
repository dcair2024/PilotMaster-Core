import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getShips } from "../api/shipsService";
import "../styles/ships.css";

export default function ShipsList() {
  const [ships, setShips] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadShips();
  }, []);

  async function loadShips() {
    try {
      const data = await getShips();
      setShips(data);
    } catch (err) {
      console.error("Erro ao buscar navios:", err);
      setShips([]);
    } finally {
      setLoading(false);
    }
  }

  const filteredShips = ships.filter((ship) =>
    ship.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Carregando navios...</p>;

  return (
    <div className="ships-page">

      {/* HEADER */}
      <div className="page-header">
        <input
          placeholder="Buscar navio..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="btn-primary"
          onClick={() => navigate("/ships/new")}
        >
          + Novo Navio
        </button>
      </div>

      {/* GRID */}
      <div className="ship-grid">
        {filteredShips.map((ship) => (
          <div key={ship.id} className="ship-card">

            <div className="ship-card-header">
              <strong className="ship-name">{ship.name}</strong>

              <span
                className={`ship-status ${
                  ship.isActive ? "active" : "inactive"
                }`}
              >
                {ship.isActive ? "Ativo" : "Inativo"}
              </span>
            </div>

            <div className="ship-card-body">
              <div className="ship-info">
                <span>GRT</span>
                <strong>{ship.grt}</strong>
              </div>

              <div className="ship-info">
                <span>Draft</span>
                <strong>{ship.draft}</strong>
              </div>

              <div className="ship-info">
                <span>Age</span>
                <strong>{ship.age}</strong>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
