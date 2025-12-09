
public class RecurringBill
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public  DayOfMonth { get; set; } = string.Empty;
    public string ? Category { get; set; }
}