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

        public async Task<IEnumerable<ManeuverHistory>> GetByScheduleIdAsync(int scheduleId)
        {
            return await _context.ManeuverHistories
                .Where(x => x.ScheduleId == scheduleId)
                .OrderBy(x => x.CreatedAt)
                .ToListAsync();
        }
    }
}
