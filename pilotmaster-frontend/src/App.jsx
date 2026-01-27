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
import ShipHistory from "./pages/ShipHistory"; // Componente para Navios
import GlobalHistory from "./pages/GlobalHistory";
import RequireParam from "./components/RequireParam";

/* 🎨 CSS */
import "./styles/pilotmaster-theme.css";
import "./styles/design-system.css";
import "./styles/cards.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            
            <Route path="/home" element={<Home />} />

            {/* --- SEÇÃO DE NAVIOS --- */}
            <Route path="/ships" element={<ShipsList />} />
            <Route path="/ships/new" element={<ShipForm />} />
            <Route 
              path="/ships/:shipId/history"
              element={
                <RequireParam name="shipId" redirectTo="/ships">
                  <ShipHistory />
                </RequireParam>
              }
            />

            {/* --- SEÇÃO DE AGENDAMENTOS --- */}
            <Route path="/schedule" element={<TestSchedulePage />} />
            <Route path="/schedule/new" element={<TestScheduleCreate />} />
            <Route 
              path="/schedule/:scheduleId/history"  
              element={
                <RequireParam name="scheduleId" redirectTo="/schedule">
                  {/* ✅ AQUI ESTAVA O ERRO: Tinha que ser ScheduleHistory */}
                  <ScheduleHistory />
                </RequireParam>
              }
            />
            
            <Route path="/schedule/report" element={<SchedulePeriodReport />} />
            <Route path="/history" element={<GlobalHistory />} />
            <Route path="/tariff" element={<TestTariffPage />} />

            <Route
              path="/settings"
              element={<div style={{ padding: 20 }}>Configurações (em construção)</div>}
            />

            <Route path="/" element={<Navigate to="/home" replace />} />
          </Route>
        </Route>

        <Route path="/test/auth" element={<TestAuthPage />} />
        <Route path="*" element={<div style={{ padding: 20 }}>404 — Não encontrado</div>} />
      </Routes>
    </BrowserRouter>
  );
}