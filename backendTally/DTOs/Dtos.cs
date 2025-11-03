namespace backendTally.DTOs;

public record SignupDto(string Email, string Name, string Password);
public record LoginDto(string Email, string Password);