using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PilotMaster.Application.Interfaces;
using PilotMaster.Domain.Entities;

namespace PilotMaster.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ShipsController : ControllerBase
{
    private readonly IShipService _service;

    public ShipsController(IShipService service)
    {
        _service = service;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll()
        => Ok(await _service.GetAllAsync());

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(int id)
    {
        var ship = await _service.GetByIdAsync(id);
        return ship == null ? NotFound() : Ok(ship);
    }

    // GET: /api/ship/{shipId}/history
    [HttpGet("{shipId}/history")]
    public async Task<IActionResult> GetShipHistory(
        int shipId,
        [FromServices] IManeuverHistoryService historyService)
    {
        var history = await historyService.GetByShipIdAsync(shipId);
        return Ok(history);
    }


    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)] // BK-41
    public async Task<IActionResult> Create([FromBody] Ship ship)
    {
        var created = await _service.CreateAsync(ship);
        return Ok(created);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)] // BK-41
    public async Task<IActionResult> Update(int id, [FromBody] Ship ship)
    {
        var updated = await _service.UpdateAsync(id, ship);
        return updated == null ? NotFound() : Ok(updated);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(int id)
    {
        var ok = await _service.DeactivateAsync(id);
        return ok
            ? Ok(new { success = true, message = "Navio desativado" })
            : NotFound();
    }
}
