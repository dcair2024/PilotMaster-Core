using Microsoft.AspNetCore.Mvc;
using PilotMaster.Application.Interfaces;
using PilotMaster.Api.Models;
using PilotMaster.Application.DTOs;

namespace PilotMaster.Api.Controllers;

[ApiController]
[Route("api/system")]
public class SystemController : ControllerBase
{
    private readonly ISystemInfoService _service;

    public SystemController(ISystemInfoService service)
    {
        _service = service;
    }

    // GET: /api/system/info
    [HttpGet("info")]
    public IActionResult GetSystemInfo()
    {
        var info = _service.GetSystemInfo();

        return Ok(ApiResponse<SystemInfoDto>.Ok(info));
    }
}
