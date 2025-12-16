
using System.Security.Claims;
using backendTally.Data;
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
            Console.WriteLine($"Authenticated UserId: {authenticatedUserId}");
            Console.WriteLine($"Looking for bill Id: {id}");


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
            var authenticatedUserId = int.Parse(userIdClaim);

            var recurringBills = await _context.RecurringBills
                .Where(b => b.UserId == authenticatedUserId)
                .Select(b => new { b.Name, b.Amount, b.DayOfMonth })
                .ToListAsync();
        }

        
        private DateTime GetEndOfWeek(DateTime date)
        {
            int daysUntilSunday = (7 - (int)date.DayOfWeek) % 7;
            return date.AddDays(daysUntilSunday);
        }

        private bool isBillInRange(int dayOfMonth, DateTime start, DateTime end)
        {
            for (var date = start)
        }

    }
}