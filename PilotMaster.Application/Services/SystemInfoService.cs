using PilotMaster.Application.DTOs;
using PilotMaster.Application.Interfaces;
using Microsoft.Extensions.Configuration;

namespace PilotMaster.Application.Services;

public class SystemInfoService : ISystemInfoService
{
    private readonly IConfiguration _configuration;
    private readonly string _environmentName;

    public SystemInfoService(
        IConfiguration configuration,
        string environmentName)
    {
        _configuration = configuration;
        _environmentName = environmentName;
    }

    public SystemInfoDto GetSystemInfo()
    {
        return new SystemInfoDto
        {
            SystemName = _configuration["SystemInfo:Name"] ?? "PilotMaster",
            Version = _configuration["SystemInfo:Version"] ?? "dev",
            Environment = _environmentName,
            BuildDate = GetBuildDate()
        };
    }

    private static DateTime GetBuildDate()
    {
        return System.IO.File.GetLastWriteTime(
            typeof(SystemInfoService).Assembly.Location
        );
    }
}
