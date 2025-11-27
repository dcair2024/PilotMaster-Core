import React, { useState } from "react";
import ScheduleService from "../api/ScheduleService";

export default function TestSchedulePage() {
  const [msg, setMsg] = useState("");

  async function handleGet() {
    setMsg("Carregando...");
    try {
      const list = await ScheduleService.getAll();
      setMsg(JSON.stringify(list, null, 2));
    } catch (err) {
      setMsg("Erro ao conectar schedule");
      console.error(err);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Teste Schedule</h1>
      <button onClick={handleGet}>Listar Agendamentos</button>
      <pre>{msg}</pre>
    </div>
  );
}
