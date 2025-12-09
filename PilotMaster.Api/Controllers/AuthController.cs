using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PilotMaster.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _config;

    public AuthController(IConfiguration config)
    {
        _config = config;
    }

    [HttpPost("login")]
    [AllowAnonymous]
    [Produces("application/json")]
    [ProducesResponseType(typeof(object), 200)]
    [ProducesResponseType(401)]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        if (request.Username != "admin" || request.Password != "123")
            return Unauthorized();

        var token = GenerateToken(request.Username);
        var refresh = Guid.NewGuid().ToString();

        return Ok(new { token, refreshToken = refresh });
    }

    [HttpPost("refresh")]
    [AllowAnonymous]
    [Produces("application/json")]
    [ProducesResponseType(typeof(object), 200)]
    public IActionResult Refresh([FromBody] RefreshRequest request)
    {
        var newToken = GenerateToken("admin");
        return Ok(new { token = newToken });
    }

    private string GenerateToken(string username)
    {
        var jwtKey = _config["Jwt:Key"]!;
        var issuer = _config["Jwt:Issuer"];       // ✅
        var audience = _config["Jwt:Audience"];   // ✅

        var key = Encoding.UTF8.GetBytes(jwtKey);
        var creds = new SigningCredentials(
            new SymmetricSecurityKey(key),
            SecurityAlgorithms.HmacSha256
        );

        var claims = new[]
        {
            new Claim(ClaimTypes.Name, username)
        };

        var token = new JwtSecurityToken(
            issuer: issuer,              // ✅
            audience: audience,          // ✅
            claims: claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

public class LoginRequest
{
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class RefreshRequest
{
    public string RefreshToken { get; set; } = string.Empty;
}
