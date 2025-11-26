
using backendTally.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backendTally.Services
{
    public class AggregateService
    {
        private readonly TallyDbContext _context;

        // Inject database context via dependency injection
        public AggregateService(TallyDbContext context)
        {
            _context = context;
        }

        // Recalculates daily totals for a specific date when transactions change
        public async Task UpdateDailyAggregate(int userId, DateOnly date)
        {
            // Find existing aggregate or create new one
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

            // Get all transactions for this day
            var transactionsForDay = await _context.Transactions
                .Where(t => t.UserId == userId && t.Date == date)
                .ToListAsync();

            // Sum all income for the day
            aggregate.TotalEarnings = transactionsForDay
                .Where(t => t.Type == "Income")
                .Sum(t => (decimal)t.Amount);

            // Sum all expenses for the day
            aggregate.TotalSpendings = transactionsForDay
                .Where(t => t.Type == "Expense")
                .Sum(t => (decimal)t.Amount);

            // Calculate net (income - expenses)
            aggregate.NetAmount = aggregate.TotalEarnings - aggregate.TotalSpendings;

            // Count transactions for the day
            aggregate.TransactionCount = transactionsForDay.Count;

            // Update timestamp
            aggregate.LastUpdated = DateTime.UtcNow;

            // Save changes to database
            await _context.SaveChangesAsync();
        }

        // Returns last 7 days formatted for chart (fills missing days with zeros)
        public async Task<List<object>> GetWeeklySummary(int userId)
        {
            // Calculate date range (today and 6 days back = 7 total)
            var endDate = DateOnly.FromDateTime(DateTime.Today);
            var startDate = endDate.AddDays(-6);

            // Query aggregates for the 7-day range
            var aggregates = await _context.DailyAggregates
                .Where(a => a.UserId == userId &&
                    a.Date >= startDate &&
                    a.Date <= endDate)
                .OrderBy(a => a.Date)
                .ToListAsync();

            // Build array of exactly 7 days
            var result = new List<object>();

            for (int i = 0; i < 7; i++)
            {
                var currentDate = startDate.AddDays(i);

                // Find aggregate for this day (null if missing)
                var dayAggregate = aggregates.FirstOrDefault(a => a.Date == currentDate);

                // Add day with actual data or zeros if missing
                result.Add(new
                {
                    name = currentDate.DayOfWeek.ToString().Substring(0, 3),  // "Mon", "Tue"
                    date = currentDate.ToString("yyyy-MM-dd"),                // "2025-11-22"
                    Earnigs = dayAggregate?.TotalEarnings ?? 0,                // Use 0 if null
                    Expenses = dayAggregate?.TotalSpendings ?? 0,             // Use 0 if null
                    net = dayAggregate?.NetAmount ?? 0                        // Use 0 if null
                });
            }

            return result;
        }
    }
}