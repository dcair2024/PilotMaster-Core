import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

export default function Sidebar({ open, onClose }) {
  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <h2 className="logo">PilotMaster</h2>

      <nav>
        <NavLink to="/home" className="nav-link" onClick={onClose}>
          Dashboard
        </NavLink>

        <NavLink to="/ships" className="nav-link" onClick={onClose}>
          Navios
        </NavLink>

        <NavLink to="/schedule" className="nav-link" onClick={onClose}>
          Agendamentos
        </NavLink>

        <NavLink to="/tariff" className="nav-link" onClick={onClose}>
          Tarifas
        </NavLink>
      </nav>
    </aside>
  );
}
