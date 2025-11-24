
using backendTally.Data;
using Microsoft.EntityFrameworkCore;
namespace backendTally.Services
{
    public class AggregateService
    {
        private readonly TallyDbContext _context;

        public AggregateService( TallyDbContext context)
        {
            _context = context;
        }

        public async Task UpdateDailyAggregate(int userId, DateOnly date)
        {
            var aggregate = await _context.DailyAggregates
                .FirstOrDefaultAsync(a => a.UserId == userId && a.Date == date);
            
            if (aggregate == null)
            {
                aggregate = new DailyAggregate
                {
                    User
                }
            }
        }
    }
}