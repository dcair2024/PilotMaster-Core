namespace PilotMaster.Domain.Exceptions;

public class DomainValidationException : Exception
{
    public string Code { get; }

    public DomainValidationException(string message, string code)
        : base(message)
    {
        Code = code;
    }
}
