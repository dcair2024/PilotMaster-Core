using Microsoft.AspNetCore.Mvc;
using PilotMaster.Application.Interfaces;
using PilotMaster.Domain.Entities;

namespace PilotMaster.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TariffController : ControllerBase
{
    private readonly ITariffCalculator _calc;

    public TariffController(ITariffCalculator calc)
    {
        _calc = calc;
    }
    [HttpGet("calculate")]
    public IActionResult Calculate(int grt, string area, decimal draft = 0, int age = 0, bool emergencial = false, bool extraordinaria = false, string deficiency = "None", bool requiresTug = false)
    {
        try
        {
            var ship = new Ship
            {
                GRT = grt,
                Draft = draft,
                Age = age,
                RequiresTug = requiresTug,
                Deficiency = Enum.TryParse<OperationalDeficiency>(deficiency, true, out var d) ? d : OperationalDeficiency.None
            };

            var basePrice = _calc.CalculateBase(grt, area);
            var final = _calc.CalculateFinal(ship, area, emergencial, extraordinaria);

            return Ok(new
            {
                grt,
                area,
                basePrice,
                final
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }
}
