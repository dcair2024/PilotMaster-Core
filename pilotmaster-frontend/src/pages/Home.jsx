import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/apiConfig";
import PageContainer from "../components/PageContainer";
import "./home.css";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadDashboard() {
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
        setLoading(false);
      }
    }

    loadDashboard();
  }, [navigate]);

  if (loading) return <p>Carregando...</p>;
  if (!data) return <p>Erro ao carregar dashboard</p>;

  const cards = [
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
      label: "Agendamentos Pendentes",
      subtitle: "requerem atenção",
    },
  ];

  return (
    <PageContainer title="Dashboard">

      <h2 className="home-greeting">Olá, Usuário 👋</h2>
      <p className="home-subtitle">Dashboard de Manobras</p>

      {/* CARDS */}
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

      {/* SEPARADOR */}
      <div className="section-separator" />

      {/* LISTA */}
      <div className="recent-schedules">
        <h3>Últimos Agendamentos</h3>

        <table className="table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Área</th>
              <th>Navio</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.recentSchedules.map((schedule) => (
              <tr key={schedule.id}>
                <td>{new Date(schedule.scheduledAt).toLocaleString()}</td>
                <td>{schedule.area}</td>
                <td>{schedule.shipName}</td>
                <td>{schedule.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* AÇÕES */}
      <div className="quick-actions">
        <button className="btn-primary">➕ Novo Agendamento</button>
        <button className="btn-secondary">📋 Ver Agendamentos</button>
      </div>

    </PageContainer>
  );
}
