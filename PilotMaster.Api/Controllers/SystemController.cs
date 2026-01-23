using Microsoft.AspNetCore.Mvc;
using PilotMaster.Application.Interfaces;

namespace PilotMaster.Api.Controllers;

[ApiController]
[Route("api/system")]
public class SystemController : ControllerBase
{
    private readonly ISystemInfoService _service;

    public SystemController(ISystemInfoService service)
    {
        _service = service;
    }

    // GET /api/system/health
    [HttpGet("health")]
    [ProducesResponseType(200)]
    public IActionResult Health()
    {
        var health = _service.GetHealth();
        return Ok(health);
    }
}
