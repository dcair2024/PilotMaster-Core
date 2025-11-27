using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace PilotMaster.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ScheduleController : ControllerBase
{
    private static List<PilotSchedule> _db = new();

    [HttpGet]
    public IActionResult Get() => Ok(_db);

    [HttpPost]
    public IActionResult Create([FromBody] PilotSchedule schedule)
    {
        schedule.Id = _db.Count + 1;
        schedule.Status = "Ativo";

        _db.Add(schedule);

        return Ok(schedule);
    }

    [HttpPut("{id}/cancel")]
    public IActionResult Cancel(int id)
    {
        var item = _db.FirstOrDefault(x => x.Id == id);
        if (item == null) return NotFound();

        item.Status = "Cancelado";

        return Ok(item);
    }
}

public class PilotSchedule
{
    public int Id { get; set; }
    public string ShipName { get; set; }
    public DateTime ETA { get; set; }
    public string Status { get; set; }
}


