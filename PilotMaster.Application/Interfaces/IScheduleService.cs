using PilotMaster.Domain.Entities;
using PilotMaster.Application.DTOs;

namespace PilotMaster.Application.Interfaces;

public interface IScheduleService
{
    Task<IEnumerable<PilotSchedule>> GetSchedules(
        DateTime? date = null,
        string? area = null
    );

    Task<PilotSchedule> CreateSchedule(PilotSchedule schedule);

    Task<bool> CancelSchedule(int id, string cancelledBy);

    // 🔵 BK-55 — Relatório por período
    Task<SchedulePeriodReportDto> GetReportByPeriodAsync(
        DateTime startDate,
        DateTime endDate
    );
}
