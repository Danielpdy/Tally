
using backendTally.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backendTally.Services;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace backendTally.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TransactionsController : ControllerBase
    {
        private readonly TallyDbContext _context;
        private readonly AggregateService _aggregateService;

        public TransactionsController(TallyDbContext context, AggregateService aggregateService)
        {
            _context = context;
            _aggregateService = aggregateService;
        }

        [HttpGet]
        public async Task<ActionResult<Transaction>> GetTransactions(DateTime? startDate, DateTime? endDate)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            var userId = int.Parse(userIdClaim);

            var transactions = _context.Transactions
                .Where(t => t.UserId == userId);

            if (startDate.HasValue)
            {
                var startDateOnly = DateOnly.FromDateTime(startDate.Value);
                transactions = transactions.Where(t => t.Date >= startDateOnly);
            }

            if (endDate.HasValue)
            {
                var endDateOnly = DateOnly.FromDateTime(endDate.Value);
                transactions = transactions.Where(t => t.Date <= endDateOnly);
            }

            var result = await transactions.ToListAsync();
                
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<Transaction>> AddTransaction ([FromBody] Transaction newTransaction)
        {
            if (newTransaction == null)
            {
                return BadRequest();
            }

            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            var authenticatedUserId = int.Parse(userIdClaim);

            newTransaction.UserId = authenticatedUserId;
            
            _context.Transactions.Add(newTransaction);
            await _context.SaveChangesAsync();

            await _aggregateService.UpdateDailyAggregate(newTransaction.UserId, newTransaction.Date);

            return Ok(newTransaction);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransactionById(int id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            int authenticatedUserId = int.Parse(userIdClaim);

            var deletedTransaction = await _context.Transactions
                .FirstOrDefaultAsync( dt => dt.Id == id && dt.UserId == authenticatedUserId);

            if (deletedTransaction == null)
            {
                return NotFound();
            }

            var transactionDate = deletedTransaction.Date;
            var userId = deletedTransaction.UserId;

            _context.Transactions.Remove(deletedTransaction);
            await _context.SaveChangesAsync();

            await _aggregateService.UpdateDailyAggregate(userId, transactionDate);

            return NoContent();

        }
    }

}