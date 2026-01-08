using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PilotMaster.Infrastructure;

namespace PilotMaster.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DashboardController : ControllerBase
{
    private readonly AppDbContext _db;

    public DashboardController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var totalShips = await _db.Ships
            .CountAsync(x => x.IsActive);

        var pendingSchedules = await _db.PilotSchedules
            .CountAsync(x => x.Status == "Scheduled");

        var recentSchedules = await _db.PilotSchedules
            .Include(x => x.Ship)
            .OrderByDescending(x => x.ScheduledAt)
            .Take(5)
            .Select(x => new
            {
                x.Id,
                x.ScheduledAt,
                x.Area,
                ShipName = x.Ship != null ? x.Ship.Name : "",
                x.Status
            })
            .ToListAsync();

        var lastTariffCalc = new
        {
            ship = "N/A",
            final = 0
        };

        return Ok(new
        {
            totalShips,
            pendingSchedules,
            recentSchedules,
            lastTariffCalc
        });
    }
    [HttpGet("report")]
    public async Task<IActionResult> GetScheduleReport([FromQuery] string? status)
    {
        var query = _db.PilotSchedules.AsQueryable();

        if (!string.IsNullOrEmpty(status))
        {
            query = query.Where(x => x.Status == status);
        }

        var report = await query
            .GroupBy(x => x.Status)
            .Select(g => new
            {
                Status = g.Key,
                Total = g.Count()
            })
            .OrderBy(x => x.Status)
            .ToListAsync();

        return Ok(report);
    }


}
