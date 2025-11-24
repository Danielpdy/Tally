
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
                    UserId = userId,
                    Date = date
                };
                _context.DailyAggregates.Add(aggregate);
            }


            var transactionsForDay = await _context.DailyAggregates
                .Where(t => t.UserId == userId && t.Date == date)
                .ToListAsync();

            aggregate.TotalEarnings = transactionsForDay
                .Where(t => t.Type == "Income")
                .Sum(t => (decimal)t.Amount);

            aggregate.TotalSpendings = transactionsForDay
                .Where(t => t.Type == "Expense")
                .Sum(t => (decimal)t.Amount);

            aggregate.NetAmount = transactionsForDay
                .Sum(transactionsForDay.)    
        }
    }
}