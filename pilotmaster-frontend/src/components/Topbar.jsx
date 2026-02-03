import { useSystemInfo } from "./SystemInfoProvider";

export default function Topbar({ toggleSidebar }) {
  const info = useSystemInfo();

  return (
    <header className="app-topbar">
      <button className="pm-menu-btn" onClick={toggleSidebar}>
        ☰
      </button>

      
     

    </header>
  );
}
