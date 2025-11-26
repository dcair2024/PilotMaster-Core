namespace PilotMaster.Domain.Entities;

public class PilotSchedule
{
    public int Id { get; set; }
    public DateTime ScheduledAt { get; set; } // horário do prático
    public string Area { get; set; } = "I";   // I, II, III, IV, ILHEUS
    public int? ShipId { get; set; }
    public Ship? Ship { get; set; }
    public string Status { get; set; } = "Scheduled"; // Scheduled, Completed, Cancelled
    public string? Notes { get; set; }
}
