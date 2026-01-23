using PilotMaster.Application.DTOs;

namespace PilotMaster.Application.Interfaces;

public interface ISystemInfoService
{
    SystemInfoDto GetSystemInfo();
    SystemHealthDto GetHealth();
}
