
using System.ComponentModel.DataAnnotations.Schema;

public class RecurringBill
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Name { get; set; } = string.Empty;

    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public string NormalizedName { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string Status
    public int DayOfMonth { get; set; }
    public string ? Category { get; set; }
    public int NumberofBills { get; set; }
}