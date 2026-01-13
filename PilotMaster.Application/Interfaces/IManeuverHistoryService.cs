using PilotMaster.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PilotMaster.Application.DTOs;

namespace PilotMaster.Application.Interfaces
{
    public interface IManeuverHistoryService
    {
        Task<IEnumerable<ManeuverHistory>> GetByScheduleIdAsync(
            int scheduleId,
            string? action,
            DateTime? from,
            DateTime? to
        );


        Task<IEnumerable<ShipHistoryDto>> GetByShipIdAsync(int shipId);
    }
}
