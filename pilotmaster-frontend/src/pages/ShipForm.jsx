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

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

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
      alert("Erro ao salvar navio");
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
            <input name="name" onChange={handleChange} required />
          </div>

          <div className="form-field">
            <label>GRT</label>
            <input name="grt" type="number" onChange={handleChange} required />
          </div>

          <div className="form-field">
            <label>Draft</label>
            <input name="draft" type="number" onChange={handleChange} required />
          </div>

          <div className="form-field">
            <label>Idade</label>
            <input name="age" type="number" onChange={handleChange} required />
          </div>
        </div>

        <label className="checkbox">
          <input type="checkbox" name="requiresTug" onChange={handleChange} />
          Requer rebocador
        </label>

        <div className="form-actions">
          <button className="btn-primary">Salvar</button>
        </div>
      </form>
    </div>
  </div>
);

}
