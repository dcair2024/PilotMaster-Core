namespace PilotMaster.Application.DTOs;

public class TariffCalculateRequest
{
    public string Name { get; set; } = string.Empty;

    public int GRT { get; set; }

    public decimal Draft { get; set; }

    public int Age { get; set; }

    public bool RequiresTug { get; set; }

    // ENUM COMO STRING NA QUERY
    public string? Deficiency { get; set; }
}
