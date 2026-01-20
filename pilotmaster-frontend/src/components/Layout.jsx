import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "../styles/layout.css";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="app-main">
        <Topbar toggleSidebar={() => setSidebarOpen(v => !v)} />

        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
 


