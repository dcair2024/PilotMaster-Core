import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/apiConfig";
import "../styles/ships.css";

export default function ShipForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    grt: "",
    draft: "",
    age: "",
    requiresTug: false,
    deficiency: 0,
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await api.post("/Ships", {
        ...form,
        grt: Number(form.grt),
        draft: Number(form.draft),
        age: Number(form.age),
        deficiency: Number(form.deficiency),
      });

      navigate("/ships");
    } catch (err) {
      if (err.response?.status === 400) {
        setError("Dados inválidos. Verifique os campos e tente novamente.");
      } else {
        setError("Erro ao salvar navio. Tente novamente.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="ships-page">
      <div className="ship-form-container">
        <h2>Novo Navio</h2>

        <form className="ship-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-field">
              <label>Nome do navio</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                disabled={submitting}
              />
            </div>

            <div className="form-field">
              <label>GRT</label>
              <input
                name="grt"
                type="number"
                value={form.grt}
                onChange={handleChange}
                required
                disabled={submitting}
              />
            </div>

            <div className="form-field">
              <label>Draft</label>
              <input
                name="draft"
                type="number"
                value={form.draft}
                onChange={handleChange}
                required
                disabled={submitting}
              />
            </div>

            <div className="form-field">
              <label>Idade</label>
              <input
                name="age"
                type="number"
                value={form.age}
                onChange={handleChange}
                required
                disabled={submitting}
              />
            </div>
          </div>

          <label className="checkbox">
            <input
              type="checkbox"
              name="requiresTug"
              checked={form.requiresTug}
              onChange={handleChange}
              disabled={submitting}
            />
            Requer rebocador
          </label>

          {error && <div className="form-error">{error}</div>}

          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/ships")}
              disabled={submitting}
            >
              Cancelar
            </button>

            <button className="btn-primary" disabled={submitting}>
              {submitting ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
