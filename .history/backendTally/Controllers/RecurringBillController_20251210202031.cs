
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

            var isExistingBill = await _context.RecurringBills
                .Where(b => b.Name == newRecurringBill.Name)
                .FirstOrDefault();

            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            var authenticatedUserId = int.Parse(userIdClaim);

            newRecurringBill.UserId = authenticatedUserId;

            _context.RecurringBills.Add(newRecurringBill);
            await _context.SaveChangesAsync();

            return Ok(newRecurringBill);
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

    }
}