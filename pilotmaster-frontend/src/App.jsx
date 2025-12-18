import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import ShipsList from "./pages/ShipsList";
import ShipForm from "./pages/ShipForm";

import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";

import TestAuthPage from "./pages/TestAuthPage";
import TestSchedulePage from "./pages/TestSchedulePage";
import TestScheduleCreate from "./pages/TestScheduleCreate";
import TestTariffPage from "./pages/TestTariffPage";

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

          {/* Layout do App */}
          <Route element={<AppLayout />}>

            {/* Dashboard */}
            <Route path="/home" element={<Home />} />

            {/* Navios */}
            <Route path="/ships" element={<ShipsList />} />
            <Route path="/ships/new" element={<ShipForm />} />

            {/* Agendamentos */}
            <Route path="/schedule" element={<TestSchedulePage />} />
            <Route path="/schedule/new" element={<TestScheduleCreate />} />

            {/* Tarifa */}
            <Route path="/tariff" element={<TestTariffPage />} />

            {/* Configurações */}
            <Route
              path="/settings"
              element={<div style={{ padding: 20 }}>Configurações (em construção)</div>}
            />

            {/* Redirecionamento padrão */}
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
