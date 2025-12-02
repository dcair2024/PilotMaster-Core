using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PilotMaster.Application.Interfaces;
using PilotMaster.Domain.Entities;

namespace PilotMaster.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ScheduleController : ControllerBase
{
    private readonly IScheduleService _service;

    public ScheduleController(IScheduleService service)
    {
        _service = service;
    }

    // GET: /api/schedule
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<PilotSchedule>), 200)]
    public async Task<IActionResult> Get([FromQuery] DateTime? date = null, [FromQuery] string? area = null)
    {
        var result = await _service.GetSchedules(date, area);
        return Ok(result);
    }

    // POST: /api/schedule
    [HttpPost]
    [ProducesResponseType(typeof(PilotSchedule), 200)]
    [ProducesResponseType(400)]
    public async Task<IActionResult> Create([FromBody] PilotSchedule schedule)
    {
        if (schedule == null)
            return BadRequest("Invalid schedule.");

        schedule.Status = "Scheduled";

        try
        {
            var created = await _service.CreateSchedule(schedule);
            return Ok(created);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    // PUT: /api/schedule/{id}/cancel
    [HttpPut("{id}/cancel")]
    [ProducesResponseType(typeof(object), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Cancel(int id)
    {
        var cancelledBy = User.Identity?.Name ?? "system";
        var ok = await _service.CancelSchedule(id, cancelledBy);

        if (!ok) return NotFound();

        return Ok(new { message = "Cancelled" });
    }
}
