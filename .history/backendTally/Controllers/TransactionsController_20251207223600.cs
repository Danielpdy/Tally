
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
        public async Task<ActionResult<Transaction>> GetTransactions()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            var userId = int.Parse(userIdClaim);

            var transactions = await _context.Transactions
                .Where(t => t.UserId == userId)
                .ToListAsync();

            return Ok(transactions);
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
    }

}