namespace PilotMaster.Domain.Exceptions;

public class ValidationException : Exception
{
    public string Code { get; }

    public ValidationException(string message, string code = "INVALID_MODEL")
        : base(message)
    {
        Code = code;
    }
}
