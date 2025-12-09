using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PilotMaster.Domain.Entities;
using PilotMaster.Infrastructure;

namespace PilotMaster.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ShipsController : ControllerBase
{
    private readonly AppDbContext _db;

    public ShipsController(AppDbContext db)
    {
        _db = db;
    }

    // GET: /api/ships
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var ships = await _db.Ships.ToListAsync();
        return Ok(ships);
    }

    // GET: /api/ships/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var ship = await _db.Ships.FindAsync(id);
        if (ship == null) return NotFound();

        return Ok(ship);
    }

    // POST: /api/ships
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Ship ship)
    {
        if (ship == null) return BadRequest("Invalid ship.");

        _db.Ships.Add(ship);
        await _db.SaveChangesAsync();

        return Ok(ship);
    }

    // PUT: /api/ships/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Ship ship)
    {
        var existing = await _db.Ships.FindAsync(id);
        if (existing == null) return NotFound();

        existing.Name = ship.Name;
        existing.GRT = ship.GRT;
        existing.Draft = ship.Draft;
        existing.Age = ship.Age;
        existing.RequiresTug = ship.RequiresTug;
        existing.Deficiency = ship.Deficiency;

        await _db.SaveChangesAsync();

        return Ok(existing);
    }

    // DELETE: /api/ships/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var ship = await _db.Ships.FindAsync(id);
        if (ship == null) return NotFound();

        _db.Ships.Remove(ship);
        await _db.SaveChangesAsync();

        return Ok(new { message = "Deleted" });
    }
}

