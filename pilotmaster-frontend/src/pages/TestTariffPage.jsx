import React, { useState } from "react";
import { calculateTariff } from "../api/TariffService";

export default function TestTariffPage() {
  const [params, setParams] = useState({
  Id: "",
  Name: "",
  GRT: "",
  Draft: "",
  Age: "",
  RequiresTug: false,
  Deficiency: 0,
});


  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setParams((prev) => ({
      ...prev,
      [name]:
        name === "RequiresTug"
          ? checked
          : name === "Deficiency"
          ? checked
            ? 1
            : 0
          : type === "number"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  const handleCalculate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    // 🔒 SANITIZAÇÃO FINAL (NUNCA PASSA NaN)
    const payload = {
      id: params.Id,
      name: params.Name,
      grt: Number(params.GRT),
      draft: Number(params.Draft),
      age: Number(params.Age),
      requiresTug: Boolean(params.RequiresTug),
      deficiency: Number(params.Deficiency),
    };

    if (
      Number.isNaN(payload.grt) ||
      Number.isNaN(payload.draft) ||
      Number.isNaN(payload.age)
    ) {
      setError("Preencha corretamente todos os campos numéricos.");
      setLoading(false);
      return;
    }

    try {
      const tariffResult = await calculateTariff(payload);
      setResult(tariffResult);
    } catch (err) {
      setError(err.message || "Não foi possível calcular a tarifa.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>⚓ Cálculo de Tarifa</h2>

      <form onSubmit={handleCalculate} className={loading ? "ds-loading" : ""}>
        <div className="form-field">
          <label className="ds-label">ID</label>
          <input
            className="ds-input"
            name="Id"
            value={params.Id}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label className="ds-label">Nome do Navio</label>
          <input
            className="ds-input"
            name="Name"
            value={params.Name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label className="ds-label">GRT</label>
          <input
            className="ds-input"
            type="number"
            name="GRT"
            value={params.GRT}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label className="ds-label">Draft</label>
          <input
            className="ds-input"
            type="number"
            name="Draft"
            value={params.Draft}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label className="ds-label">Idade</label>
          <input
            className="ds-input"
            type="number"
            name="Age"
            value={params.Age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label>
            <input
              type="checkbox"
              name="RequiresTug"
              checked={params.RequiresTug}
              onChange={handleChange}
            />{" "}
            Requer Rebocador
          </label>
        </div>

        <div className="form-field">
          <label>
            <input
              type="checkbox"
              name="Deficiency"
              checked={params.Deficiency === 1}
              onChange={handleChange}
            />{" "}
            Possui Deficiência
          </label>
        </div>

        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? "Calculando..." : "Calcular Tarifa"}
        </button>
      </form>

      {error && <div className="ds-error">⚠️ {error}</div>}

      {result && (
        <div
          style={{
            marginTop: "20px",
            border: "1px solid #ccc",
            padding: "15px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h3>💰 Resultado do Cálculo para {result.ship}</h3>
          <p>
            <strong>Tarifa Base:</strong> R$ {result.base.toFixed(2)}
          </p>
          <p>
            <strong>Multiplicador:</strong> {result.multiplier.toFixed(2)}x
          </p>
          <p
            style={{
              fontWeight: "bold",
              fontSize: "1.2em",
              color: "#007bff",
            }}
          >
            Tarifa Final: R$ {result.final.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}
