import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "../styles/layout.css";
import { getSystemInfo } from "../services/systemService";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [systemInfo, setSystemInfo] = useState(null);

  useEffect(() => {
    getSystemInfo().then(setSystemInfo).catch(() => {});
  }, []);

  return (
    <div className="app-layout">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        systemInfo={systemInfo}
      />

      {/* OVERLAY MOBILE */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="app-main">
        <Topbar toggleSidebar={() => setSidebarOpen(v => !v)} />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
