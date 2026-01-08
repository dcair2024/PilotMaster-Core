using Microsoft.EntityFrameworkCore;
using PilotMaster.Application.Interfaces;
using PilotMaster.Domain.Entities;
using PilotMaster.Infrastructure;

namespace PilotMaster.Application.Services
{
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
            {
                query = query.Where(x => x.Action == action);
            }

            if (from.HasValue)
            {
                query = query.Where(x => x.CreatedAt >= from.Value);
            }

            if (to.HasValue)
            {
                query = query.Where(x => x.CreatedAt <= to.Value);
            }

            return await query
                .OrderBy(x => x.CreatedAt)
                .ToListAsync();
        }
    }
}

