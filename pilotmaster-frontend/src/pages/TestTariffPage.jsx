import React, { useState } from 'react';
import { calculateTariff } from '../api/TariffService';

export default function TestTariffPage() {
    // Estado inicial com valores de teste
    const [params, setParams] = useState({
        Id: 'TEST-001',
        Name: 'Demo Ship',
        GRT: 1000,
        Draft: 5,
        Age: 5,
        RequiresTug: false,
        Deficiency: 0 // numérico conforme esperado
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Manipulador de inputs corrigido (sem NaN)
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setParams(prev => ({
            ...prev,
            [name]:
                // checkbox normal
                name === "RequiresTug"
                    ? checked

                // checkbox deficiencia → 0 ou 1
                : name === "Deficiency"
                    ? (checked ? 1 : 0)

                // inputs numéricos → permitem "" sem virar NaN
                : type === "number"
                    ? (value === "" ? "" : Number(value))

                // qualquer outra coisa
                : value
        }));
    };

    const handleCalculate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const tariffResult = await calculateTariff(params);
            setResult(tariffResult);
        } catch (err) {
            console.error("Erro no cálculo da tarifa:", err);
            setError(err.message || "Não foi possível calcular a tarifa.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h2>⚓ Cálculo de Tarifa (FE-03)</h2>
            <p>Página de teste para o endpoint GET /api/Tariff/calculate.</p>

            <form onSubmit={handleCalculate} style={{ display: 'grid', gap: '10px' }}>
                <label>ID:</label>
                <input type="text" name="Id" value={params.Id} onChange={handleChange} required />

                <label>Nome do Navio:</label>
                <input type="text" name="Name" value={params.Name} onChange={handleChange} required />

                <label>GRT (Gross Tonnage):</label>
                <input type="number" name="GRT" value={params.GRT} onChange={handleChange} required />

                <label>Draft (Calado):</label>
                <input type="number" name="Draft" value={params.Draft} onChange={handleChange} required />

                <label>Idade (Anos):</label>
                <input type="number" name="Age" value={params.Age} onChange={handleChange} required />

                {/* Checkbox RequiresTug */}
                <div>
                    <input
                        id="RequiresTug"
                        type="checkbox"
                        name="RequiresTug"
                        checked={params.RequiresTug}
                        onChange={handleChange}
                    />
                    <label htmlFor="RequiresTug">Requer Rebocador?</label>
                </div>

                {/* Checkbox Deficiency */}
                <div>
                    <input
                        id="Deficiency"
                        type="checkbox"
                        name="Deficiency"
                        checked={params.Deficiency === 1}
                        onChange={handleChange}
                    />
                    <label htmlFor="Deficiency">Possui Deficiência?</label>
                </div>

                <button type="submit" disabled={loading} style={{ padding: '10px', marginTop: '15px' }}>
                    {loading ? 'Calculando...' : 'Calcular Tarifa'}
                </button>
            </form>

            {error && <p style={{ color: 'red', marginTop: '15px' }}>⚠️ Erro: {error}</p>}

            {result && (
                <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px', backgroundColor: '#f9f9f9' }}>
                    <h3>💰 Resultado do Cálculo para {result.ship || params.Name}</h3>
                    <p><strong>Tarifa Base:</strong> R$ {result.base.toFixed(2)}</p>
                    <p><strong>Multiplicador:</strong> {result.multiplier.toFixed(2)}x</p>
                    <p style={{ fontWeight: 'bold', fontSize: '1.2em', color: '#007bff' }}>
                        Tarifa Final: R$ {result.final.toFixed(2)}
                    </p>
                </div>
            )}
        </div>
    );
}
