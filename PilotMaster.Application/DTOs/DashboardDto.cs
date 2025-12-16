namespace PilotMaster.Application.DTOs;

public class DashboardDto
{
    public int TotalShips { get; set; }
    public int PendingSchedules { get; set; }
    public List<RecentScheduleDto> RecentSchedules { get; set; } = [];
}

public class RecentScheduleDto
{
    public int Id { get; set; }
    public DateTime ScheduledAt { get; set; }
    public string Area { get; set; } = string.Empty;
    public string ShipName { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
}
