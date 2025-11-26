using PilotMaster.Domain.Entities;

namespace PilotMaster.Infrastructure;

public static class DbSeeder
{
    public static void Seed(AppDbContext db)
    {
        if (!db.Ships.Any())
        {
            db.Ships.AddRange(
                new Ship { Name = "MSC TEST", GRT = 15000, Draft = 9.5m, Age = 5, RequiresTug = false, Deficiency = OperationalDeficiency.None },
                new Ship { Name = "Tanker EX", GRT = 35000, Draft = 13.0m, Age = 20, RequiresTug = true, Deficiency = OperationalDeficiency.InChannels_1_45 }
            );
            db.SaveChanges();
        }

        if (!db.PilotSchedules.Any())
        {
            var s = db.Ships.First();
            db.PilotSchedules.AddRange(
                new PilotSchedule { ScheduledAt = DateTime.UtcNow.AddHours(24), Area = "I", ShipId = s.Id, Status = "Scheduled" }
            );
            db.SaveChanges();
        }
    }
}

