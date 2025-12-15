import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/topbar"; 
import "./home.css";
import api from "../api/apiConfig";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await api.get("/Dashboard");
        setData(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          navigate("/auth/login");
        }
      } finally {
        setLoading(false); // ← LINHA CRÍTICA
      }
    };

    loadDashboard();
  }, [navigate]);

  if (loading) return <div>Carregando...</div>;
  if (!data) return <div>Erro ao carregar dashboard</div>;

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
