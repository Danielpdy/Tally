
public class BudgetGoal
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public decimal TargetAmount { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}