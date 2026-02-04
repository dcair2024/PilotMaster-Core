using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PilotMaster.Application.DTOs;
using PilotMaster.Domain.Entities;

namespace PilotMaster.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TariffController : ControllerBase
{

    [HttpGet("calculate")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult Calculate(
    [FromQuery] int id,
    [FromQuery] string name,
    [FromQuery] int grt,
    [FromQuery] decimal draft,
    [FromQuery] int age,
    [FromQuery] bool requiresTug,
    [FromQuery] OperationalDeficiency deficiency = OperationalDeficiency.None
)
    {
        var ship = new Ship
        {
            Id = id,
            Name = name,
            GRT = grt,
            Draft = draft,
            Age = age,
            RequiresTug = requiresTug,
            Deficiency = deficiency
        };

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

