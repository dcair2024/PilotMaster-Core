import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "../styles/layout.css";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={`app-layout ${sidebarOpen ? "" : "collapsed"}`}>
      <Sidebar open={sidebarOpen} />
      
      <div className="main-area">
        <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="content">{children}</main>
      </div>
    </div>
  );
}

