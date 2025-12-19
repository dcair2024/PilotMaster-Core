namespace PilotMaster.Api.Models;

public class ApiResponse<T>
{
    public bool Success { get; set; }
    public string? Message { get; set; }
    public string? Code { get; set; }
    public T? Data { get; set; }

    public static ApiResponse<T> Ok(T data) => new()
    {
        Success = true,
        Data = data
    };

    public static ApiResponse<T> Fail(string message, string? code = null) => new()
    {
        Success = false,
        Message = message,
        Code = code
    };
}
