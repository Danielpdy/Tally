using System.Security.Cryptography.X509Certificates;
using Microsoft.EntityFrameworkCore;


namespace TallyDbConetxt.Data
{
    public class TallyDbContext : DbContext
    {
        public TallyDbContext(DbContextOptions<TallyDbContext> options) : base(options)
        {
            public DbSet<User> Users { get; set; }
        }
    }
}