import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "../styles/layout.css";

export default function AppLayout() {
  return (
    <div className="app-layout">
      <aside className="app-sidebar">
        <Sidebar />
      </aside>

      <main className="app-main">
        <header className="app-topbar">
          <Topbar />
        </header>

        <section className="app-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
