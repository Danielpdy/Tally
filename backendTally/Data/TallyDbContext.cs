using System.Security.Cryptography.X509Certificates;
using backendTally.Models;
using Microsoft.EntityFrameworkCore;


namespace backendTally.Data
{
    public class TallyDbContext : DbContext
    {
        public TallyDbContext(DbContextOptions<TallyDbContext> options) : base(options) { }
        
        
        public DbSet<User> Users { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<DailyAggregate> DailyAggregates { get; set; }
        public DbSet<RecurringBill> RecurringBills { get; set; }
        public DbSet<BudgetGoal> BudgetGoals { get; set; }
        public DbSet<BillPayment> BillPayments { get; set; }
        public DbSet<FinantialGoal> FinantialGoals { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        
    }
}