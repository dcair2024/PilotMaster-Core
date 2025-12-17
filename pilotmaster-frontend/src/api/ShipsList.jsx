import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getShips } from "../api/shipsService";
import Layout from "../components/Layout";
import "../styles/table.css";

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
      console.error("Erro ao carregar navios", err);
    } finally {
      setLoading(false);
    }
  }

  const filtered = ships.filter((ship) =>
    ship.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <Layout>
        <p>Carregando navios...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="toolbar">
        <input
          placeholder="Buscar navio..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="primary"
          onClick={() => navigate("/ships/new")}
        >
          + Novo Navio
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>GRT</th>
            <th>Draft</th>
            <th>Age</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((ship) => (
            <tr key={ship.id}>
              <td>{ship.name}</td>
              <td>{ship.grt}</td>
              <td>{ship.draft}</td>
              <td>{ship.age}</td>
              <td>{ship.isActive ? "Ativo" : "Inativo"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
