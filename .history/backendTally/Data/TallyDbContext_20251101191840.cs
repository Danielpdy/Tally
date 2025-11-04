using System.Security.Cryptography.X509Certificates;
using Microsoft.EntityFrameworkCore;


namespace backendTally.Data
{
    public class TallyDbContext : DbContext
    {
        public TallyDbContext(DbContextOptions<TallyDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
        
        public DbSet<User> Users { get; set; }
        
    }
}