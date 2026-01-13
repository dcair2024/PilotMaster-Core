namespace PilotMaster.Application.DTOs;

public class SchedulePeriodReportDto
{
    public int TotalSchedules { get; set; }
    public int TotalCancelled { get; set; }
    public int TotalActive { get; set; }
    public int TotalCompleted { get; set; }
}
