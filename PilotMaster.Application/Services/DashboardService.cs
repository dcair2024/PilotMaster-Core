using Microsoft.EntityFrameworkCore;
using PilotMaster.Application.DTOs;
using PilotMaster.Infrastructure;

namespace PilotMaster.Application.Services;

public class DashboardService
{
    private readonly AppDbContext _db;

    public DashboardService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<DashboardDto> GetDashboard()
    {
        var totalShips = await _db.Ships
            .CountAsync(s => s.IsActive);

        var pendingSchedules = await _db.PilotSchedules
            .CountAsync(s => s.Status == "Scheduled");

        var recentSchedules = await _db.PilotSchedules
            .Include(s => s.Ship)
            .OrderByDescending(s => s.ScheduledAt)
            .Take(5)
            .Select(s => new RecentScheduleDto
            {
                Id = s.Id,
                ScheduledAt = s.ScheduledAt,
                Area = s.Area,
                ShipName = s.Ship != null ? s.Ship.Name : "",
                Status = s.Status
            })
            .ToListAsync();

        return new DashboardDto
        {
            TotalShips = totalShips,
            PendingSchedules = pendingSchedules,
            RecentSchedules = recentSchedules
        };
    }
}
