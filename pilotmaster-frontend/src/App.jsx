import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import ShipsList from "./pages/ShipsList";
import ShipForm from "./pages/ShipForm";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import RequireParam from "./components/RequireParam";

import ScheduleHistory from "./pages/ScheduleHistory";
import SchedulePeriodReport from "./pages/SchedulePeriodReport";
import ShipHistory from "./pages/ShipHistory";
import GlobalHistory from "./pages/GlobalHistory";

import TestAuthPage from "./pages/TestAuthPage";
import TestSchedulePage from "./pages/TestSchedulePage";
import TestScheduleCreate from "./pages/TestScheduleCreate";
import TestTariffPage from "./pages/TestTariffPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/auth/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>

            <Route path="/home" element={<Home />} />

            {/* NAVIOS */}
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

            {/* AGENDAMENTOS */}
            <Route path="/schedule" element={<TestSchedulePage />} />
            <Route path="/schedule/new" element={<TestScheduleCreate />} />
            <Route
              path="/schedule/:scheduleId/history"
              element={
                <RequireParam name="scheduleId" redirectTo="/schedule">
                  <ScheduleHistory />
                </RequireParam>
              }
            />
            <Route path="/schedule/report" element={<SchedulePeriodReport />} />

            {/* OUTROS */}
            <Route path="/history" element={<GlobalHistory />} />
            <Route path="/tariff" element={<TestTariffPage />} />

            <Route path="/" element={<Navigate to="/home" replace />} />
          </Route>
        </Route>

        <Route path="/test/auth" element={<TestAuthPage />} />
        <Route path="*" element={<div style={{ padding: 20 }}>404</div>} />

      </Routes>
    </BrowserRouter>
  );
}
