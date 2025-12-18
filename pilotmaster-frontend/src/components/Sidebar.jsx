import "../styles/sidebar.css";

export default function Sidebar({ open }) {
  return (
    <aside className={`sidebar ${open ? "open" : "closed"}`}>
      
      <div className="sidebar-header">
        <span className="brand">PilotMaster</span>
      </div>

      <nav className="sidebar-nav">
        <a className="active">Navios</a>
        <a>Agendamentos</a>
        <a>Tarifas</a>
      </nav>

    </aside>
  );
}
