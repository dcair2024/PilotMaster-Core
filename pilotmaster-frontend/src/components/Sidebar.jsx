import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="sidebar">
      <div className="logo">🟦 Pilotmaster</div>

      <nav className="menu">
        <Link
          to="/home"
          className={pathname === "/home" ? "active" : ""}
        >
          🏠 Dashboard
        </Link>

        <Link
          to="/schedule"
          className={pathname === "/schedule" ? "active" : ""}
        >
          📅 Agendamentos
        </Link>

        <Link
          to="/tariff"
          className={pathname === "/tariff" ? "active" : ""}
        >
          💰 Tarifas
        </Link>

        <Link
          to="/ships"
          className={pathname === "/ships" ? "active" : ""}
        >
          🚢 Navios
        </Link>

        <Link
          to="/settings"
          className={pathname === "/settings" ? "active" : ""}
        >
          ⚙️ Configurações
        </Link>
      </nav>

      <button className="logout">🚪 Sair</button>
    </aside>
  );
}
