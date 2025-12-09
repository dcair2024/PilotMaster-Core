import { useState } from "react";

export default function ShipsList() {
  const [page, setPage] = useState(1);

  const shipsMock = [
    { id: 1, name: "Tanker EX", grt: 35000 },
    { id: 2, name: "Bulk Alpha", grt: 22000 },
    { id: 3, name: "Carrier One", grt: 45000 }
  ];

  return (
    <div style={{ padding: 32 }}>
      <h1>Lista de Navios</h1>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>GRT</th>
          </tr>
        </thead>
        <tbody>
          {shipsMock.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.grt}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        ⬅ Anterior
      </button>

      <button onClick={() => setPage(page + 1)}>
        Próximo ➡
      </button>
    </div>
  );
}
