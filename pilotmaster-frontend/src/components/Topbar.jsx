import "../styles/topbar.css";

export default function Topbar({ toggleSidebar }) {
  return (
    <header className="topbar">
      <button
        className="menu-btn"
        onClick={toggleSidebar}
        aria-label="Abrir menu"
      >
        ☰
      </button>

      <span>Sistema de Gestão Portuária</span>
    </header>
  );
}
