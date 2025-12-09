
public class RecurringBill
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string DayOfMonth { get; set; } = string.Empty;
    public string ? Category { get; set; }
}