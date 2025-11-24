using System.Security.Cryptography.X509Certificates;
using Microsoft.EntityFrameworkCore;


namespace backendTally.Data
{
    public class TallyDbContext : DbContext
    {
        public TallyDbContext(DbContextOptions<TallyDbContext> options) : base(options) { }
        
        
        public DbSet<User> Users { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<
        
    }
}