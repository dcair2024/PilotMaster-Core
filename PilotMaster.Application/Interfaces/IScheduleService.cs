using PilotMaster.Domain.Entities;

namespace PilotMaster.Application.Interfaces;

public interface IScheduleService
{
    Task<IEnumerable<PilotSchedule>> GetSchedules(DateTime? date = null, string? area = null);
    Task<PilotSchedule> CreateSchedule(PilotSchedule schedule);
    Task<bool> CancelSchedule(int id, string cancelledBy);
}

