namespace backendTally.DTOs;

public record SignupDto(string Email, string Name, string Password, string PhoneNumber);
public record LoginDto(string Email, string Password);
public record BudgetDataUpdateDto(decimal TargetAmount);
public record NewBillPaymentDto(int recurringBillId, DateTime PaidDate);