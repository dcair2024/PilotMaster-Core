using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using PilotMaster.Application.Interfaces;
using PilotMaster.Application.Services;
using PilotMaster.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// ========================
// JWT CONFIG ✅
// ========================

var jwtSection = builder.Configuration.GetSection("Jwt");
var jwtKey = jwtSection["Key"]!;
var issuer = jwtSection["Issuer"];
var audience = jwtSection["Audience"];

var keyBytes = Encoding.UTF8.GetBytes(jwtKey);

// ========================
// CORS (AJUSTE MÍNIMO) ✅
// ========================

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy
            .WithOrigins("http://localhost:5173") // FRONTEND
            .AllowAnyHeader()
            .AllowAnyMethod());
});

// ========================
// AUTH ✅
// ========================

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigningKey = true,
            ValidateLifetime = true,

            ValidIssuer = issuer,
            ValidAudience = audience,
            IssuerSigningKey = new SymmetricSecurityKey(keyBytes)
        };
    });

// ========================
// DB ✅
// ========================

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// ========================
// SERVICES ✅
// ========================

builder.Services.AddScoped<IScheduleService, ScheduleService>();
builder.Services.AddScoped<IShipService, ShipService>();
builder.Services.AddScoped<DashboardService>();
builder.Services.AddScoped<IManeuverHistoryService, ManeuverHistoryService>();
builder.Services.AddScoped<ISystemInfoService>(sp =>
{
    var config = sp.GetRequiredService<IConfiguration>();
    var env = sp.GetRequiredService<IWebHostEnvironment>();

    return new SystemInfoService(
        config,
        env.EnvironmentName
    );
});




// ========================
// CONTROLLERS + SWAGGER ✅
// ========================

builder.Services.AddControllers();


builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "PilotMaster.Api",
        Version = "v1"
    });

    var securitySchema = new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header usando o esquema Bearer.",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT"
    };

    c.AddSecurityDefinition("Bearer", securitySchema);

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

var app = builder.Build();

// ========================
// MIDDLEWARE ORDER (CRÍTICO) ✅
// ========================

app.UseMiddleware<ExceptionMiddleware>();

app.UseCors("AllowAll");

app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers().RequireCors("AllowAll");

app.Run();




