

using Microsoft.Extensions.Configuration.UserSecrets;

public class DailyAggregate
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public DateOnly Date { get; set; }
    public decimal TotalEarnings { get; set; }
    public decimal TotalSpendings { get; set; }
    public decimal NetAmount { get; set; }
    public int TransactionCount { get; set; }
    public DateTime LastUpdated 
}