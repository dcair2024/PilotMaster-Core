using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PilotMaster.Domain.Entities
{
    public class ManeuverHistory
    {
        public int Id { get; set; }

        public int ScheduleId { get; set; }

        public string Action { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

