using PilotMaster.Domain.Entities;

namespace PilotMaster.Application.Interfaces;

public interface IShipService
{
    Task<IEnumerable<Ship>> GetAllAsync();
    Task<Ship?> GetByIdAsync(int id);
    Task<Ship> CreateAsync(Ship ship);
    Task<Ship?> UpdateAsync(int id, Ship ship);
    Task<bool> DeactivateAsync(int id);
}

