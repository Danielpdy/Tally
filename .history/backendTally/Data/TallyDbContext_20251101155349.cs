using Microsoft.EntityFrameworkCore;


namespace TallyDbConetxt.Data
{
    public class TallyDbContext : DbContext
    {
        public TallyDbContext(DbContextOptions<TallyDbContext> options) : base(options)
    }
}