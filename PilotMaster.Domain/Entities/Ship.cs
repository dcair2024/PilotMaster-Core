namespace PilotMaster.Domain.Entities;

public class Ship
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int GRT { get; set; }            // tonnage
    public decimal Draft { get; set; }      // calado (m)
    public int Age { get; set; }            // anos
    public bool RequiresTug { get; set; }  // rebocador
    public OperationalDeficiency? Deficiency { get; set; }
}

public enum OperationalDeficiency
{
    None,
    OutsideChannels_1_15,   // 1.15
    InChannels_1_45,        // 1.45
    PreventsPropulsion_2_0  // 2.0
}
