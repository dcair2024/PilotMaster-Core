import { useSystemInfo } from "./SystemInfoProvider";

export default function Topbar({ toggleSidebar }) {
  const info = useSystemInfo();

  return (
    <header className="app-topbar">
      <button className="pm-menu-btn" onClick={toggleSidebar}>
        ☰
      </button>

      <div className="pm-system">
        <span className="pm-system-name">
          {info?.systemName ?? "PilotMaster"}
        </span>
        <span className="pm-system-meta">
          {info?.environment} · v{info?.version}
        </span>
      </div>
     

    </header>
  );
}
