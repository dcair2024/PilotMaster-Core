namespace PilotMaster.Application.DTOs;

public class SystemHealthDto
{
    public string Status { get; set; } = "ok";
    public string Version { get; set; } = string.Empty;
    public string Environment { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; }
}
