import React, { useState } from "react";
import TariffService from "../api/TariffService";

export default function TestTariffPage() {
  const [msg, setMsg] = useState("");

  async function handleTest() {
    setMsg("Carregando...");
    try {
      const res = await TariffService.test();
      setMsg(res);
    } catch (err) {
      setMsg("Erro tariff");
      console.error(err);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Teste Tariff</h1>
      <button onClick={handleTest}>Testar Tariff</button>
      <p>{msg}</p>
    </div>
  );
}
