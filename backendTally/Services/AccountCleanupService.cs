using backendTally.Data;
using Microsoft.EntityFrameworkCore;

namespace backendTally.Services;

public class AccountCleanupService : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<AccountCleanupService> _logger;

    public AccountCleanupService(IServiceScopeFactory scopeFactory, ILogger<AccountCleanupService> logger)
    {
        _scopeFactory = scopeFactory;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await CleanupDeletedAccounts(stoppingToken);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during account cleanup");
            }

            await Task.Delay(TimeSpan.FromHours(24), stoppingToken);
        }
    }

    private async Task CleanupDeletedAccounts(CancellationToken ct)
    {
        using var scope = _scopeFactory.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<TallyDbContext>();

        var cutoff = DateTime.UtcNow.AddMonths(-1);
        var usersToDelete = await context.Users
            .Where(u => u.IsDeleted && u.DeletedAt != null && u.DeletedAt < cutoff)
            .ToListAsync(ct);

        if (usersToDelete.Count == 0) return;

        _logger.LogInformation("Hard-deleting {Count} accounts past 30-day retention", usersToDelete.Count);

        foreach (var user in usersToDelete)
        {
            var uid = user.Id;

            await context.BillPayments.Where(x => x.UserId == uid).ExecuteDeleteAsync(ct);
            await context.RecurringBills.Where(x => x.UserId == uid).ExecuteDeleteAsync(ct);
            await context.Transactions.Where(x => x.UserId == uid).ExecuteDeleteAsync(ct);
            await context.DailyAggregates.Where(x => x.UserId == uid).ExecuteDeleteAsync(ct);
            await context.BudgetGoals.Where(x => x.UserId == uid).ExecuteDeleteAsync(ct);
            await context.FinantialGoals.Where(x => x.UserId == uid).ExecuteDeleteAsync(ct);
            await context.RefreshTokens.Where(x => x.UserId == uid).ExecuteDeleteAsync(ct);
            await context.PasswordResetTokens.Where(x => x.UserId == uid).ExecuteDeleteAsync(ct);

            context.Users.Remove(user);
            await context.SaveChangesAsync(ct);

            _logger.LogInformation("Hard-deleted user {UserId}", uid);
        }
    }
}
