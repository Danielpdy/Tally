

public class Transaction
{
    public int Id { get; set; }
    public int 
    public string Type { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public DateOnly Date { get; set; }
    public string Description { get; set; } = string.Empty;
    public string Account { get; set; } = string.Empty;
    public float Amount { get; set; }
    public string Status { get; set; } = string.Empty;
    public string? Notes  { get; set; }
    public int NumberTransactions { get; set; }

}