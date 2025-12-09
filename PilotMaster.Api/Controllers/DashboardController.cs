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
        var totalShips = await _db.Ships.CountAsync();

        var pendingSchedules = await _db.PilotSchedules
            .CountAsync(x => x.Status == "Scheduled");

        var recentSchedules = await _db.PilotSchedules
            .OrderByDescending(x => x.ScheduledAt)
            .Take(5)
            .CountAsync();

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
}
