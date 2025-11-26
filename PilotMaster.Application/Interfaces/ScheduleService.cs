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

    public async Task<IEnumerable<PilotSchedule>> GetSchedules(DateTime? date = null, string? area = null)
    {
        var q = _db.PilotSchedules.Include(p => p.Ship).AsQueryable();
        if (date.HasValue)
        {
            var d = date.Value.Date;
            q = q.Where(x => x.ScheduledAt.Date == d);
        }
        if (!string.IsNullOrEmpty(area))
            q = q.Where(x => x.Area.ToUpper() == area.ToUpper());

        return await q.OrderBy(x => x.ScheduledAt).ToListAsync();
    }

    public async Task<PilotSchedule> CreateSchedule(PilotSchedule schedule)
    {
        // valida conflito simples: mesmo horário e mesma área
        var conflict = await _db.PilotSchedules.AnyAsync(x => x.Area == schedule.Area && x.ScheduledAt == schedule.ScheduledAt && x.Status == "Scheduled");
        if (conflict) throw new InvalidOperationException("Conflito de horário para essa área.");

        _db.PilotSchedules.Add(schedule);
        await _db.SaveChangesAsync();
        return schedule;
    }

    public async Task<bool> CancelSchedule(int id, string cancelledBy)
    {
        var s = await _db.PilotSchedules.FindAsync(id);
        if (s == null) return false;
        s.Status = "Cancelled";
        s.Notes = $"Cancelled by {cancelledBy} at {DateTime.UtcNow}";
        await _db.SaveChangesAsync();
        return true;
    }
}

