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
        // 🔧 Normalização da área
        schedule.Area = schedule.Area?.Trim().ToUpper();

        if (schedule.ScheduledAt <= DateTime.UtcNow)
            throw new InvalidOperationException("Data de agendamento não pode ser no passado.");

        // 🔒 1️⃣ Área obrigatória
        if (string.IsNullOrWhiteSpace(schedule.Area))
            throw new InvalidOperationException("Área é obrigatória.");

        var area = schedule.Area.Trim().ToUpper();

        // 🔒 2️⃣ ShipId obrigatório
        if (schedule.ShipId <= 0)
            throw new InvalidOperationException("ShipId é obrigatório para criar um agendamento.");

        // 🔒 3️⃣ Data não pode ser no passado
        if (schedule.ScheduledAt <= DateTime.UtcNow)
            throw new InvalidOperationException("Não é permitido agendar para o passado.");

        // 🔒 4️⃣ Navio deve existir e estar ativo
        var ship = await _db.Ships
            .FirstOrDefaultAsync(s => s.Id == schedule.ShipId && s.IsActive);

        if (ship == null)
            throw new InvalidOperationException("Navio inexistente ou inativo.");

        // 🔒 5️⃣ Conflito de horário (somente Scheduled)
        var conflict = await _db.PilotSchedules.AnyAsync(x =>
            x.Area.ToUpper() == area &&
            x.ScheduledAt == schedule.ScheduledAt &&
            x.Status == "Scheduled");

        if (conflict)
            throw new InvalidOperationException("Conflito de horário para essa área.");

        // 🔒 6️⃣ Backend define status
        schedule.Status = "Scheduled";
        schedule.Area = area;

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

