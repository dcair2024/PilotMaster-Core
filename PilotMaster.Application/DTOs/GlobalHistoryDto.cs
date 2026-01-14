namespace PilotMaster.Application.DTOs;

public class GlobalHistoryDto
{
    public int ScheduleId { get; set; }

    public int ShipId { get; set; }
    public string ShipName { get; set; } = string.Empty;

    public string Action { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }
}
