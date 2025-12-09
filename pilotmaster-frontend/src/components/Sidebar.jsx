import { NavLink, useNavigate } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <aside className="sidebar md:block hidden">
      <div className="sidebar-logo">⛴️ Pilotmaster</div>

      <nav className="sidebar-nav">
        <NavLink to="/home" className="nav-item">
          <span className="nav-icon">🏠</span> Dashboard
        </NavLink>

        <NavLink to="/schedule" className="nav-item">
          <span className="nav-icon">📅</span> Agendamentos
        </NavLink>

        <NavLink to="/tariff" className="nav-item">
          <span className="nav-icon">💰</span> Tarifas
        </NavLink>

        <NavLink to="/ships" className="nav-item">
          <span className="nav-icon">🚢</span> Navios
        </NavLink>

        <NavLink to="/config" className="nav-item">
          <span className="nav-icon">⚙️</span> Configurações
        </NavLink>
      </nav>

      <button className="logout-btn" onClick={logout}>
        🚪 Sair
      </button>
    </aside>
  );
}
