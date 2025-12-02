using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PilotMaster.Domain.Entities;

namespace PilotMaster.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TariffController : ControllerBase
{
    [HttpGet("calculate")]
    [ProducesResponseType(typeof(object), 200)]
    [ProducesResponseType(400)]

    public IActionResult Calculate([FromQuery] Ship ship)
    {
        decimal baseValue = ship.GRT * 0.15m;

        if (ship.Age > 20)
            baseValue *= 1.10m;

        if (ship.RequiresTug)
            baseValue += 500;

        decimal deficiencyMultiplier = ship.Deficiency switch
        {
            OperationalDeficiency.OutsideChannels_1_15 => 1.15m,
            OperationalDeficiency.InChannels_1_45 => 1.45m,
            OperationalDeficiency.PreventsPropulsion_2_0 => 2.0m,
            _ => 1m
        };

        decimal final = baseValue * deficiencyMultiplier;

        return Ok(new
        {
            Ship = ship.Name,
            Base = baseValue,
            Multiplier = deficiencyMultiplier,
            Final = final
        });
    }
}

