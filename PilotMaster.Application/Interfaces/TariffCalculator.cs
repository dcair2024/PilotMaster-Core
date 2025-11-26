using PilotMaster.Application.Interfaces;
using PilotMaster.Domain.Entities;

namespace PilotMaster.Application.Services;

public class TariffCalculator : ITariffCalculator
{
    private readonly Dictionary<string, List<(int min, int max, decimal price)>> _table;
    private readonly Dictionary<string, decimal> _over50Factors;
    // custos fixos de serviços (item 4)
    public static class Extras
    {
        public const decimal TomadaCabo_AreaI = 4617m;
        public const decimal TomadaCabo_AreaII_III = 7761m;
        public const decimal TomadaCabo_Ilheus = 4732m;
        public const decimal TransporteRapidoSSA = 3145m;
        public const decimal TransporteRapidoIlheus = 6174m;
        public const decimal TransporteObrigatorio_SaRoque_REGAS = 4602m;
        public const decimal TransportePratico_ForaBarra = 7779m;
        public const decimal TransportePratico_MadreDeDeus = 3030m;
        public const decimal TransportePratico_Cotegipe = 2767m;
        public const decimal TransportePratico_Aratu_BNA_TMG = 2635m;
        public const decimal ManobrasEspeciaisPorHoraPerPratico = 35024m;
        public const decimal DesencalhePorHoraPerPratico = 86339m;
    }

    public TariffCalculator()
    {
        _table = new Dictionary<string, List<(int min, int max, decimal price)>>();
        // Area I
        _table["I"] = new List<(int, int, decimal)> {
            (0,10000,23005m),
            (10001,20000,29965m),
            (20001,30000,36907m),
            (30001,40000,43784m),
            (40001,50000,50677m)
        };
        // Area II
        _table["II"] = new List<(int, int, decimal)> {
            (0,10000,43735m),
            (10001,20000,51202m),
            (20001,30000,58797m),
            (30001,40000,66346m),
            (40001,50000,73911m)
        };
        // Area III
        _table["III"] = new List<(int, int, decimal)> {
            (0,10000,54673m),
            (10001,20000,63955m),
            (20001,30000,73306m),
            (30001,40000,82670m),
            (40001,50000,90220m)
        };
        // Area IV
        _table["IV"] = new List<(int, int, decimal)> {
            (0,10000,71078m),
            (10001,20000,83146m),
            (20001,30000,95295m),
            (30001,40000,107477m),
            (40001,50000,117284m)
        };
        // Ilhéus
        _table["ILHEUS"] = new List<(int, int, decimal)> {
            (0,10000,44683m),
            (10001,20000,52313m),
            (20001,30000,60073m),
            (30001,40000,67786m),
            (40001,50000,75515m)
        };

        _over50Factors = new Dictionary<string, decimal>
        {
            {"I", 1.38m}, {"II", 1.46m}, {"III", 1.55m}, {"IV", 2.02m}, {"ILHEUS", 1.42m}
        };
    }

    public decimal CalculateBase(int grt, string area)
    {
        area = area?.ToUpper() ?? throw new ArgumentException("area");
        if (!_table.ContainsKey(area)) throw new ArgumentException("Área inválida");

        var ranges = _table[area];
        foreach (var (min, max, price) in ranges)
        {
            if (grt >= min && grt <= max) return price;
        }

        // maior que 50.000 -> faixa anterior + (GRT-50000) * fator_area
        var last = ranges.Last();
        var basePrice = last.price;
        var extra = (grt - 50000) * _over50Factors[area];
        return basePrice + extra;
    }

    public decimal CalculateFinal(Ship ship, string area, bool emergencial = false, bool extraordinaria = false, decimal? selectedDeficiencyFactor = null)
    {
        if (ship == null) throw new ArgumentNullException(nameof(ship));
        var value = CalculateBase(ship.GRT, area);

        // calado > 12.8m
        if (ship.Draft > 12.8m) value *= 1.3m;

        // idade > 18 anos
        if (ship.Age > 18) value *= 1.1m;

        // deficiência operacional: usar enum ou factor passado
        decimal deficiencyFactor = 1.0m;
        if (selectedDeficiencyFactor.HasValue) deficiencyFactor = selectedDeficiencyFactor.Value;
        else if (ship.Deficiency.HasValue && ship.Deficiency.Value != OperationalDeficiency.None)
        {
            deficiencyFactor = ship.Deficiency.Value switch
            {
                OperationalDeficiency.OutsideChannels_1_15 => 1.15m,
                OperationalDeficiency.InChannels_1_45 => 1.45m,
                OperationalDeficiency.PreventsPropulsion_2_0 => 2.0m,
                _ => 1.0m
            };
        }
        value *= deficiencyFactor;

        // emergencial / extraordinária
        if (emergencial) value *= 2.0m;       // +100% => x2
        if (extraordinaria) value *= 3.0m;   // +200% => x3

        // rebocador -> valor adicional fixo (aqui somamos um exemplo, ajuste se quiser outro comportamento)
        if (ship.RequiresTug) value += 0m; // deixar zero por padrão, ou some custo específico se tiver tabela (item 3.8 não detalhado)

        return Math.Round(value, 2);
    }
}
