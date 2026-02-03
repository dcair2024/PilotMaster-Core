import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/apiConfig";
import PageContainer from "../components/PageContainer";
import "./home.css";
import { NavLink } from "react-router-dom";


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

    {/* ===== RESUMO ===== */}
    <section className="pm-card">
      <h2 className="home-greeting">Olá, Usuário 👋</h2>
      <p className="home-subtitle">Dashboard de Manobras</p>
    </section>

    {/* ===== MÉTRICAS ===== */}
    <section className="pm-card" style={{ marginTop: 24 }}>
      <h3 className="pm-title">Métricas</h3>

      <div className="cards-grid">
        {cards.map((c, i) => (
          <div
            key={i}
            className="pm-card"
            style={{ borderTop: `4px solid ${c.color}` }}
          >
            <div className="card-icon">{c.icon}</div>
            <div className="card-value">{c.value}</div>
            <div className="card-label">{c.label}</div>
            <div className="card-sub">{c.subtitle}</div>
          </div>
        ))}
      </div>
    </section>

    {/* ===== ÚLTIMOS AGENDAMENTOS ===== */}
    <section className="pm-card" style={{ marginTop: 24 }}>
      <h3 className="pm-title">Últimos Agendamentos</h3>

      {data.recentSchedules.length === 0 ? (
        <EmptyState
          title="Nenhum agendamento recente"
          subtitle="Os últimos agendamentos aparecerão aqui"
        />
      ) : (
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
            {data.recentSchedules.map(schedule => (
              <tr key={schedule.id}>
                <td>{new Date(schedule.scheduledAt).toLocaleString()}</td>
                <td>{schedule.area}</td>
                <td>{schedule.shipName}</td>
                <td>{schedule.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>

   {/* ===== AÇÕES RÁPIDAS ===== */}
<section className="pm-card" style={{ marginTop: 24 }}>
  <h3 className="pm-title">Acesso rápido</h3>

  <div className="cards-grid">

    <NavLink to="/history" className="pm-card">
      <h3>📜 Histórico Global</h3>
      <p className="pm-subtitle">
        Visualize todos os eventos do sistema
      </p>
    </NavLink>

    <NavLink to="/schedule/report" className="pm-card">
      <h3>📊 Relatório por Período</h3>
      <p className="pm-subtitle">
        Análises e dados consolidados
      </p>
    </NavLink>

    <NavLink to="/ships" className="pm-card">
      <h3>🚢 Navios</h3>
      <p className="pm-subtitle">
        Cadastro e informações da frota
      </p>
    </NavLink>

    <NavLink to="/schedule" className="pm-card">
      <h3>🗓️ Agendamentos</h3>
      <p className="pm-subtitle">
        Gerencie manobras e operações
      </p>
    </NavLink>

  </div>
</section>


  </PageContainer>
);

}
