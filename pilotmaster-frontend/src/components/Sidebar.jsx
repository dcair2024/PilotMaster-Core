import "../styles/sidebar.css";

export default function Sidebar({ open }) {
  return (
    <aside className={`sidebar ${open ? "open" : "closed"}`}>
      <h2>PilotMaster</h2>

      <nav>
        <a className="active">Navios</a>
        <a>Agendamentos</a>
        <a>Tarifas</a>
      </nav>
    </aside>
  );
}


