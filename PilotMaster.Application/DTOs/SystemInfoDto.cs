namespace PilotMaster.Application.DTOs;

public class SystemInfoDto
{
    public string SystemName { get; set; } = string.Empty;
    public string Version { get; set; } = string.Empty;
    public string Environment { get; set; } = string.Empty;
    public DateTime BuildDate { get; set; }
}
