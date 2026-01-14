import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import ShipsList from "./pages/ShipsList";
import ShipForm from "./pages/ShipForm";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

import TestAuthPage from "./pages/TestAuthPage";
import TestSchedulePage from "./pages/TestSchedulePage";
import TestScheduleCreate from "./pages/TestScheduleCreate";
import TestTariffPage from "./pages/TestTariffPage";
import ScheduleHistory from "./pages/ScheduleHistory";
import SchedulePeriodReport from "./pages/SchedulePeriodReport";
import ShipHistory from "./pages/ShipHistory";
import GlobalHistory from "./pages/GlobalHistory";




import "./styles/design-system.css";
import "./styles/cards.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN (rota pública) */}
        <Route path="/auth/login" element={<Login />} />

        {/* ROTAS PROTEGIDAS */}
        <Route element={<ProtectedRoute />}>

          {/* LAYOUT ÚNICO DO APP */}
          <Route element={<Layout />}>

            {/* Dashboard */}
            <Route path="/home" element={<Home />} />

            {/* Navios */}
            <Route path="/ships" element={<ShipsList />} />
            <Route path="/ships/new" element={<ShipForm />} />

            {/* Agendamentos */}
            <Route path="/schedule" element={<TestSchedulePage />} />
            <Route path="/schedule/new" element={<TestScheduleCreate />} />

            {/* HISTÓRICO DO SCHEDULE */}
            <Route
              path="/schedule/:scheduleId/history"
              element={<ScheduleHistory />}
            />

            {/* RELATÓRIO DE SCHEDULES POR PERÍODO */}
            <Route
              path="/schedule/report"
              element={<SchedulePeriodReport />}
            />
            {/* HISTÓRICO DO NAVIO */}
            <Route
              path="/ships/:shipId/history"
              element={<ShipHistory />}

            />
            {/* HISTÓRICO GLOBAL */}
            <Route
              path="/history"
              element={<GlobalHistory />}
            />


            {/* Tarifa */}
            <Route path="/tariff" element={<TestTariffPage />} />

            {/* Configurações */}
            <Route
              path="/settings"
              element={<div style={{ padding: 20 }}>Configurações (em construção)</div>}
            />

            {/* Redirect padrão */}
            <Route path="/" element={<Navigate to="/home" replace />} />

          </Route>
        </Route>

        {/* Testes isolados */}
        <Route path="/test/auth" element={<TestAuthPage />} />

        {/* 404 */}
        <Route
          path="*"
          element={<div style={{ padding: 20 }}>404 — Não encontrado</div>}
        />

      </Routes>
    </BrowserRouter>
  );
}
