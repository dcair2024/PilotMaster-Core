import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/topbar";   // <<< AJUSTADO AQUI
import "./home.css";
import api from "../api/apiConfig";


export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/Dashboard").then(res => setData(res.data));
  }, []);

  if (!data) return <div>Carregando...</div>;

  const cards = [
    {
      color: "#10B981",
      icon: "📅",
      value: data.recentSchedules,
      label: "Manobras Realizadas",
      subtitle: "total acumulado",
    },
    {
      color: "#3B82F6",
      icon: "🚢",
      value: data.totalShips,
      label: "Navios Cadastrados",
      subtitle: "na base",
    },
    {
      color: "#F59E0B",
      icon: "⚠️",
      value: data.pendingSchedules,
      label: "Pendentes",
      subtitle: "requerem atenção",
    },
    {
      color: "#8B5CF6",
      icon: "💰",
      value: "$" + data.lastTariffCalc.final,
      label: "Última Tarifa",
      subtitle: "navio " + data.lastTariffCalc.ship,
    },
  ];

  return (
    <div className="layout">
      <Sidebar />

      <TopBar />

      <main className="home-content">
        <h2 className="title">Olá, Usuário 👋</h2>
        <p className="subtitle">Dashboard de Manobras</p>

        <div className="cards-grid">
          {cards.map((c, i) => (
            <div key={i} className="card" style={{ borderTopColor: c.color }}>
              <div className="card-icon">{c.icon}</div>
              <div className="card-value">{c.value}</div>
              <div className="card-label">{c.label}</div>
              <div className="card-sub">{c.subtitle}</div>
            </div>
          ))}
        </div>

        <div className="quick-actions">
          <button className="btn-primary">➕ Novo Agendamento</button>
          <button className="btn-secondary">📋 Ver Agendamentos</button>
        </div>
      </main>
    </div>
  );
}
