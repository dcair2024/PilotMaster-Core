using System.Net;
using System.Text.Json;

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
        catch (Exception ex)
        {
            context.Response.ContentType = "application/json";

            // 🔥 REGRA DE VALIDAÇÃO (BK-41)
            if (ex is ArgumentException || ex.InnerException is ArgumentException)
            {
                var message = ex is ArgumentException
                    ? ex.Message
                    : ex.InnerException!.Message;

                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;

                await context.Response.WriteAsync(JsonSerializer.Serialize(new
                {
                    success = false,
                    message = message,
                    code = "INVALID_MODEL"
                }));

                return;
            }

            // ☠️ ERRO REAL DE SERVIDOR
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            await context.Response.WriteAsync(JsonSerializer.Serialize(new
            {
                success = false,
                message = "Erro inesperado no servidor.",
                code = "INTERNAL_ERROR"
            }));
        }
    }
}


