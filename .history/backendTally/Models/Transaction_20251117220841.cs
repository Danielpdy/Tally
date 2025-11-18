

public class Transaction
{
    public int Id { get; set; }
    public string Type { get; set; } = string.Empty;
    public DateOnly Date { get; set; }
    public string Description { get; set; } = string.Empty;
    public string Account { get; set; } = string.Empty;
    public float Amount { get; set; }
    public string Status { get; set; } = string.Empty;
    public int NumberTransactions { get; set; }

}