using Microsoft.EntityFrameworkCore;
using PilotMaster.Application.Interfaces;
using PilotMaster.Domain.Entities;
using PilotMaster.Infrastructure;
using PilotMaster.Application.DTOs;
using PilotMaster.Domain.Exceptions;

namespace PilotMaster.Application.Services;

public class ManeuverHistoryService : IManeuverHistoryService
{
    private readonly AppDbContext _context;

    public ManeuverHistoryService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ManeuverHistory>> GetByScheduleIdAsync(
        int scheduleId,
        string? action,
        DateTime? from,
        DateTime? to)
    {
        var query = _context.ManeuverHistories
            .Where(x => x.ScheduleId == scheduleId)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(action))
            query = query.Where(x => x.Action == action);

        if (from.HasValue)
            query = query.Where(x => x.CreatedAt >= from.Value);

        if (to.HasValue)
            query = query.Where(x => x.CreatedAt <= to.Value);

        var result = await query
            .OrderBy(x => x.CreatedAt)
            .ToListAsync();

        if (!result.Any())
            throw new NotFoundException(
                "History not found for this schedule",
                "HISTORY_NOT_FOUND"
            );

        return result;
    }

    public async Task<IEnumerable<ShipHistoryDto>> GetByShipIdAsync(int shipId)
    {
        var result = await _context.PilotSchedules
            .Where(s => s.ShipId == shipId)
            .Join(
                _context.ManeuverHistories,
                schedule => schedule.Id,
                history => history.ScheduleId,
                (schedule, history) => new ShipHistoryDto
                {
                    ScheduleId = schedule.Id,
                    Action = history.Action,
                    Description = history.Description,
                    CreatedAt = history.CreatedAt
                }
            )
            .OrderBy(x => x.CreatedAt)
            .ToListAsync();

        if (!result.Any())
            throw new NotFoundException(
                "History not found for this ship",
                "SHIP_HISTORY_NOT_FOUND"
            );

        return result;
    }

    public async Task<IEnumerable<GlobalHistoryDto>> GetGlobalHistoryAsync()
    {
        var result = await _context.ManeuverHistories
            .Join(
                _context.PilotSchedules,
                history => history.ScheduleId,
                schedule => schedule.Id,
                (history, schedule) => new { history, schedule }
            )
            .Join(
                _context.Ships,
                hs => hs.schedule.ShipId,
                ship => ship.Id,
                (hs, ship) => new GlobalHistoryDto
                {
                    ScheduleId = hs.schedule.Id,
                    ShipId = ship.Id,
                    ShipName = ship.Name,
                    Action = hs.history.Action,
                    Description = hs.history.Description,
                    CreatedAt = hs.history.CreatedAt
                }
            )
            .OrderBy(x => x.CreatedAt)
            .ToListAsync();

        if (!result.Any())
            throw new NotFoundException(
                "Global history not found",
                "GLOBAL_HISTORY_NOT_FOUND"
            );

        return result;
    }
}
