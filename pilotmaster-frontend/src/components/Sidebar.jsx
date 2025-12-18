import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">PilotMaster</h2>

      <nav>
        <NavLink to="/home" className="nav-link">
          Dashboard
        </NavLink>
        <NavLink to="/ships" className="nav-link">
          Navios
        </NavLink>
        <NavLink to="/schedule" className="nav-link">
          Agendamentos
        </NavLink>
        <NavLink to="/tariff" className="nav-link">
          Tarifas
        </NavLink>
      </nav>
    </aside>
  );
}
