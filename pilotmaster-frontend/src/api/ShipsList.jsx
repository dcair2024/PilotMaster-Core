import { useEffect, useState } from "react";
import { getShips } from "../api/shipsService";
import "../styles/table.css";

export default function ShipsList() {
  const [ships, setShips] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadShips();
  }, []);

  async function loadShips() {
    const data = await getShips();
    setShips(data);
  }

  const filtered = ships.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="toolbar">
        <input
          placeholder="Buscar navio..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="primary">+ Novo Navio</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>GRT</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(ship => (
            <tr key={ship.id}>
              <td>{ship.id}</td>
              <td>{ship.name}</td>
              <td>{ship.grt}</td>
              <td>✏️ 👁 🗑</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
