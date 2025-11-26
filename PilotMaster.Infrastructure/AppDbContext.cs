using Microsoft.EntityFrameworkCore;
using PilotMaster.Domain.Entities;
using System.Collections.Generic;

namespace PilotMaster.Infrastructure;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Ship> Ships { get; set; } = null!;
    public DbSet<PilotSchedule> PilotSchedules { get; set; } = null!;
}

