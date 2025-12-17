import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { createShip } from "../api/shipsService";

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

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await createShip({
        ...form,
        grt: Number(form.grt),
        draft: Number(form.draft),
        age: Number(form.age),
        deficiency: Number(form.deficiency),
      });

      alert("Navio criado com sucesso!");
      navigate("/ships");
    } catch (err) {
      alert("Erro ao criar navio. Verifique os dados.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <h2>Novo Navio</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <input
          name="name"
          placeholder="Nome do navio"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="grt"
          type="number"
          placeholder="GRT"
          value={form.grt}
          onChange={handleChange}
          required
        />

        <input
          name="draft"
          type="number"
          placeholder="Draft"
          value={form.draft}
          onChange={handleChange}
          required
        />

        <input
          name="age"
          type="number"
          placeholder="Idade"
          value={form.age}
          onChange={handleChange}
          required
        />

        <input
          name="deficiency"
          type="number"
          placeholder="Deficiência"
          value={form.deficiency}
          onChange={handleChange}
        />

        <label>
          <input
            type="checkbox"
            name="requiresTug"
            checked={form.requiresTug}
            onChange={handleChange}
          />
          Requer rebocador
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </Layout>
  );
}
