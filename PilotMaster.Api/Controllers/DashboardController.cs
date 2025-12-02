using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace PilotMaster.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DashboardController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        var response = new
        {
            recentSchedules = 5,
            totalShips = 12,
            pendingSchedules = 2,
            lastTariffCalc = new { ship = "TEST", final = 15 }
        };

        return Ok(response);
    }
}

