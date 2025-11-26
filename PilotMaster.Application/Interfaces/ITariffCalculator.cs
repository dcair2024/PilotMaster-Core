using PilotMaster.Domain.Entities;

namespace PilotMaster.Application.Interfaces;

public interface ITariffCalculator
{
    decimal CalculateBase(int grt, string area);
    decimal CalculateFinal(Ship ship, string area, bool emergencial = false, bool extraordinaria = false, decimal? selectedDeficiencyFactor = null);
}
