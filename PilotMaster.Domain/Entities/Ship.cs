namespace PilotMaster.Domain.Entities;

public class Ship
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public int GRT { get; set; }          // Tonelagem
    public decimal Draft { get; set; }    // Calado (m)
    public int Age { get; set; }          // Anos

    public bool RequiresTug { get; set; }

    public OperationalDeficiency? Deficiency { get; set; }

    public bool IsActive { get; set; } = true;
}


public enum OperationalDeficiency
{
    None,
    OutsideChannels_1_15,   // 1.15
    InChannels_1_45,        // 1.45
    PreventsPropulsion_2_0  // 2.0
}
