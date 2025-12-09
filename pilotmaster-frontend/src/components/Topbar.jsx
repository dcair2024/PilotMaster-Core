import "./topbar.css";

export default function TopBar({ onMenuClick }) {
  return (
    <header className="topbar md:hidden">
      <div className="topbar-logo">⛴️ Pilotmaster</div>
      <button className="menu-btn" onClick={onMenuClick}>☰</button>
    </header>
  );
}
