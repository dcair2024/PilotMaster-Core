using System.Net;
using System.Text.Json;
using PilotMaster.Domain.Exceptions;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;

    public ExceptionMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (NotFoundException ex)
        {
            await WriteError(
                context,
                HttpStatusCode.NotFound,
                ex.Message,
                ex.Code
            );
        }
        catch (DomainValidationException ex)
        {
            await WriteError(
                context,
                HttpStatusCode.BadRequest,
                ex.Message,
                ex.Code
            );
        }
        catch (ArgumentException ex)
        {
            await WriteError(
                context,
                HttpStatusCode.BadRequest,
                ex.Message,
                "INVALID_ARGUMENT"
            );
        }
        catch (Exception)
        {
            await WriteError(
                context,
                HttpStatusCode.InternalServerError,
                "Erro inesperado no servidor.",
                "INTERNAL_ERROR"
            );
        }
    }

    private static async Task WriteError(
        HttpContext context,
        HttpStatusCode status,
        string message,
        string code)
    {
        if (context.Response.HasStarted)
            return;

        context.Response.Clear();
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)status;

        var response = new
        {
            message,
            code
        };

        await context.Response.WriteAsync(
            JsonSerializer.Serialize(response)
        );
    }
}
