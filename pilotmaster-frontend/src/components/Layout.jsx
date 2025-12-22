import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "../styles/layout.css";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar
  open={sidebarOpen}
  onClose={() => setSidebarOpen(false)}
/>

<div className="main-area">
  <Topbar toggleSidebar={() => setSidebarOpen(prev => !prev)} />
  <main className="content">
    <Outlet />
  </main>
</div>

    </div>
  );
}



