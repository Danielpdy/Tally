namespace backendTally.Models
{
    public class BillPayment
    {
        public int Id { get; set; }
        public int RecurringBillId { get; set; }
        public int UserId { get; set; }
        public DateTime PaidDate { get}
    }
}