import Layout from "../components/Layout";
import "../styles/table.css";

export default function ShipsList() {
  return (
    <Layout>
      <div className="page-header">
        <input placeholder="Buscar navio..." />
        <button className="btn-primary">+ Novo Navio</button>
      </div>

      <div className="table-card">
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
            <tr>
              <td>1</td>
              <td>Tanker EX</td>
              <td>35000</td>
              <td>✏️ 👁️ 🗑️</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
