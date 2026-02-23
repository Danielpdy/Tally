namespace backendTally.DTOs;

public record SignupDto(string Email, string Name, string Password, string? PhoneNumber);
public record LoginDto(string Email, string Password);
public record BudgetDataUpdateDto(decimal TargetAmount);
public record NewBillPaymentDto(int RecurringBillId, DateTime PaidDate);
public record ForgotPasswordDto(string Email);
public record ResetPasswordDto(string Token, string NewPassword);
public record UpdateUserDto(string? Name, string? Email, string? PhoneNumber);
public record ChangePasswordDto(string CurrentPassword, string NewPassword);
public record OAuthLoginDto(string Email, string Name, string Provider);