
using System.Security.Claims;
using backendTally.Data;
using backendTally.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backendTally.Models
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class RecurringBillController : ControllerBase
    {
        private readonly TallyDbContext _context;

        public RecurringBillController(TallyDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<RecurringBill>> GetRecurringBills()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            var userId = int.Parse(userIdClaim);

            var recurringBills = await _context.RecurringBills
                .Where( t => t.UserId == userId)
                .ToListAsync();

            return Ok(recurringBills);
        }


        [HttpPost]
        public async Task<ActionResult<RecurringBill>> GetRecurringBill([FromBody] RecurringBill newRecurringBill)
        {
            if (newRecurringBill == null)
            {
                return BadRequest();
            }


            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            var authenticatedUserId = int.Parse(userIdClaim);
            newRecurringBill.UserId = authenticatedUserId;

            try
            {
                _context.RecurringBills.Add(newRecurringBill);
                await _context.SaveChangesAsync();
                return Ok(newRecurringBill);
            } catch(DbUpdateException ex)
            {
                if (ex.InnerException?.Message.Contains("IX_RecurringBills_UserId_NormalizedName") == true)
                {
                    return Conflict(new
                    {
                        message = $"A bill with {newRecurringBill.Name} already exists"
                    });
                }
                throw;
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecurringBillById(int id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            var authenticatedUserId = int.Parse(userIdClaim);

            var billDeleted = await _context.RecurringBills
                .FirstOrDefaultAsync( b => b.Id == id && b.UserId == authenticatedUserId);

            if (billDeleted == null)
            {
                return NotFound();
            }

            _context.RecurringBills.Remove(billDeleted);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("dueThisWeek")]
        public async Task<ActionResult<RecurringBill>> GetBillsDueThisWeek()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null)
            {
                return Unauthorized();
            }
            var authenticatedUserId = int.Parse(userIdClaim);

            var recurringBills = await _context.RecurringBills
                .Where(b => b.UserId == authenticatedUserId)
                .Select(b => new { b.Id, b.Name, b.Amount, b.DayOfMonth })
                .ToListAsync();

            var today = DateTime.UtcNow.Date;
            var endOfWeek = WeekCalculator.GetCurrentWeekEnd();


            var upcomingBills = recurringBills
                .Where(bill => IsBillInRange(bill.DayOfMonth, today, endOfWeek))
                .ToList();

            var total = upcomingBills.Sum(b => b.Amount);

            return Ok(new
            {
                Total = total,
                UpcomingBills = upcomingBills
            });
                
        }

        [HttpGet("overdueThisWeek")]
        public async Task<ActionResult<RecurringBill>> GetBillsOverdueThisWeek()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            int authenticatedUserId = int.Parse(userIdClaim);


            var startOfWeek = WeekCalculator.GetCurrentWeekStart();
            var endOfWeek = WeekCalculator.GetCurrentWeekEnd();
            var recurringBills = await _context.RecurringBills
                .Where(rb => rb.UserId == authenticatedUserId)
                .Select(rb => new { rb.Id, rb.Name, rb.Amount, rb.DayOfMonth})
                .ToListAsync();

            var upcomingBills = recurringBills
                .Where(rb => IsBillInRange(rb.DayOfMonth, startOfWeek, endOfWeek))
                .ToList();

            var today = DateTime.UtcNow.Date;
            var overdueBills = upcomingBills
                .Where(rb => rb.DayOfMonth < today.Day)
                
                .ToList();

            return Ok(new
            {
                OverdueBills = overdueBills
            });   
        }

        private bool IsBillInRange(int dayOfMonth, DateTime start, DateTime end)
        {
            for (var date = start; date <= end; date = date.AddDays(1))
            {
                int lastDayOfMonth = DateTime.DaysInMonth(date.Year, date.Month);
                int effectiveDayOfMonth = Math.Min(dayOfMonth, lastDayOfMonth);

                if (date.Day == effectiveDayOfMonth)
                {
                    return true;
                }
            }

            return false;
        }
    }
}