using Microsoft.Extensions.Configuration;
using PilotMaster.Application.DTOs;
using PilotMaster.Application.Interfaces;

public class SystemInfoService : ISystemInfoService
{
    private readonly IConfiguration _config;
    private readonly string _environment;

    public SystemInfoService(IConfiguration config, string environment)
    {
        _config = config;
        _environment = environment;
    }

    public SystemInfoDto GetSystemInfo()
    {
        return new SystemInfoDto
        {
            Name = _config["SystemInfo:Name"]!,
            Version = _config["SystemInfo:Version"]!
        };
    }

    public SystemHealthDto GetHealth()
    {
        return new SystemHealthDto
        {
            Status = "ok",
            Version = _config["SystemInfo:Version"]!,
            Environment = _environment,
            Timestamp = DateTime.UtcNow
        };
    }
}
