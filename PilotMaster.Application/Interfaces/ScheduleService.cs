using Microsoft.EntityFrameworkCore;
using PilotMaster.Application.Interfaces;
using PilotMaster.Domain.Entities;
using PilotMaster.Infrastructure;

namespace PilotMaster.Application.Services;

public class ScheduleService : IScheduleService
{
    private readonly AppDbContext _db;

    public ScheduleService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<IEnumerable<PilotSchedule>> GetSchedules(
        DateTime? date = null,
        string? area = null)
    {
        var query = _db.PilotSchedules
            .AsNoTracking()
            .Include(p => p.Ship)
            .AsQueryable();

        if (date.HasValue)
        {
            var targetDate = date.Value.Date;
            query = query.Where(p => p.ScheduledAt.Date == targetDate);
        }

        if (!string.IsNullOrWhiteSpace(area))
        {
            var normalizedArea = area.Trim().ToUpper();
            query = query.Where(p => p.Area.ToUpper() == normalizedArea);
        }

        return await query
            .OrderBy(p => p.ScheduledAt)
            .ToListAsync();
    }

    public async Task<PilotSchedule> CreateSchedule(PilotSchedule schedule)
    {
        schedule.Area = schedule.Area?.Trim().ToUpper();

        if (schedule.ScheduledAt <= DateTime.UtcNow)
            throw new InvalidOperationException("Data de agendamento não pode ser no passado.");

        if (string.IsNullOrWhiteSpace(schedule.Area))
            throw new InvalidOperationException("Área é obrigatória.");

        if (schedule.ShipId <= 0)
            throw new InvalidOperationException("ShipId é obrigatório para criar um agendamento.");

        var ship = await _db.Ships
            .FirstOrDefaultAsync(s => s.Id == schedule.ShipId && s.IsActive);

        if (ship == null)
            throw new InvalidOperationException("Navio inexistente ou inativo.");

        var conflict = await _db.PilotSchedules.AnyAsync(x =>
            x.Area.ToUpper() == schedule.Area &&
            x.ScheduledAt == schedule.ScheduledAt &&
            x.Status == "Scheduled");

        if (conflict)
            throw new InvalidOperationException("Conflito de horário para essa área.");

        schedule.Status = "Scheduled";

        _db.PilotSchedules.Add(schedule);
        await _db.SaveChangesAsync();

        // 🧾 HISTÓRICO (append-only)
        _db.ManeuverHistories.Add(new ManeuverHistory
        {
            ScheduleId = schedule.Id,
            Action = "CREATED",
            Description = "Schedule created",
            CreatedAt = DateTime.UtcNow
        });

        await _db.SaveChangesAsync();

        return schedule;
    }

    public async Task<bool> CancelSchedule(int id, string cancelledBy)
    {
        var s = await _db.PilotSchedules.FindAsync(id);
        if (s == null) return false;

        s.Status = "Cancelled";
        s.Notes = $"Cancelled by {cancelledBy} at {DateTime.UtcNow}";

        // 🧾 HISTÓRICO (append-only)
        _db.ManeuverHistories.Add(new ManeuverHistory
        {
            ScheduleId = s.Id,
            Action = "CANCELLED",
            Description = $"Cancelled by {cancelledBy}",
            CreatedAt = DateTime.UtcNow
        });

        await _db.SaveChangesAsync();

        return true;
    }
}
