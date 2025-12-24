namespace backendTally.DTOs;

public record SignupDto(string Email, string Name, string Password, string PhoneNumber);
public record LoginDto(string Email, string Password);
public record BudgetDataUpdate()