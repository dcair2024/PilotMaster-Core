using Microsoft.EntityFrameworkCore;
using PilotMaster.Application.Interfaces;
using PilotMaster.Domain.Entities;
using PilotMaster.Infrastructure;

namespace PilotMaster.Application.Services;

public class ShipService : IShipService
{
    private readonly AppDbContext _db;

    public ShipService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<IEnumerable<Ship>> GetAllAsync()
    {
        return await _db.Ships
            .Where(s => s.IsActive)
            .OrderBy(s => s.Name)
            .ToListAsync();
    }

    public async Task<Ship?> GetByIdAsync(int id)
    {
        return await _db.Ships
            .FirstOrDefaultAsync(s => s.Id == id && s.IsActive);
    }

    public async Task<Ship> CreateAsync(Ship ship)
    {
        Validate(ship);

        ship.IsActive = true;

        _db.Ships.Add(ship);
        await _db.SaveChangesAsync();

        return ship;
    }

    public async Task<Ship?> UpdateAsync(int id, Ship ship)
    {
        var existing = await _db.Ships.FindAsync(id);
        if (existing == null || !existing.IsActive) return null;

        Validate(ship);

        existing.Name = ship.Name;
        existing.GRT = ship.GRT;
        existing.Draft = ship.Draft;
        existing.Age = ship.Age;
        existing.RequiresTug = ship.RequiresTug;
        existing.Deficiency = ship.Deficiency;

        await _db.SaveChangesAsync();
        return existing;
    }

    public async Task<bool> DeactivateAsync(int id)
    {
        var ship = await _db.Ships.FindAsync(id);
        if (ship == null || !ship.IsActive) return false;

        ship.IsActive = false;
        await _db.SaveChangesAsync();
        return true;
    }

    // 🔒 Validações reais
    private static void Validate(Ship ship)
    {
        if (string.IsNullOrWhiteSpace(ship.Name))
            throw new ArgumentException("Nome do navio é obrigatório.");

        if (ship.GRT <= 0)
            throw new ArgumentException("GRT deve ser maior que zero.");

        if (ship.Draft <= 0)
            throw new ArgumentException("Draft inválido.");

        if (ship.Age < 0)
            throw new ArgumentException("Idade inválida.");
    }
}
