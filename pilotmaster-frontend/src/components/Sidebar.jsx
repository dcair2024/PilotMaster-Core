import { NavLink } from "react-router-dom";
import { useSystemInfo } from "./SystemInfoProvider";
import "../styles/sidebar.css";
import logo from '../assets/logo/pilotmaster-logo.png';



export default function Sidebar({ open, onClose }) {
  const info = useSystemInfo();

  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      
      <div className="sidebar-logo">
  <img src={logo} alt="PilotMaster" />
</div>


      <nav className="sidebar-nav">
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
 