using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PilotMaster.Application.Interfaces;

namespace PilotMaster.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class HistoryController : ControllerBase
{
    private readonly IManeuverHistoryService _service;

    public HistoryController(IManeuverHistoryService service)
    {
        _service = service;
    }

    // GET: /api/history
    [HttpGet]
    public async Task<IActionResult> GetGlobalHistory()
    {
        var result = await _service.GetGlobalHistoryAsync();
        return Ok(result);
    }
}
