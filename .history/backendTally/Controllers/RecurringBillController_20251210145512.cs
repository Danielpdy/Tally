
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

            _context.RecurringBills.Add(newRecurringBill);
            await _context.SaveChangesAsync();

            return Ok(newRecurringBill);
        }

        public async Task<IActionResult> DeleteRecurringBillById()
        {
            var userIdClaim = User
        }

    }
}