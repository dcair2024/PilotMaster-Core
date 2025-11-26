using Microsoft.AspNetCore.Mvc;
using PilotMaster.Application.Interfaces;
using PilotMaster.Domain.Entities;

namespace PilotMaster.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ScheduleController : ControllerBase
{
    private readonly IScheduleService _service;

    public ScheduleController(IScheduleService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] DateTime? date, [FromQuery] string? area)
    {
        var list = await _service.GetSchedules(date, area);
        return Ok(list);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] PilotSchedule schedule)
    {
        try
        {
            var created = await _service.CreateSchedule(schedule);
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new { message = ex.Message });
        }
    }

    [HttpPut("{id}/cancel")]
    public async Task<IActionResult> Cancel(int id, [FromQuery] string cancelledBy = "unknown")
    {
        var ok = await _service.CancelSchedule(id, cancelledBy);
        if (!ok) return NotFound();
        return NoContent();
    }
}

