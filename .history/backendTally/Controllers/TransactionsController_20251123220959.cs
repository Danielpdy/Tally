
using backendTally.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backendTally.Services;

namespace backendTally.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class TransactionsController : ControllerBase
    {
        private readonly TallyDbContext _context;
        private readonly Agg

        public TransactionsController(TallyDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<Transaction>> GetTransactions()
        {
            return Ok(await _context.Transactions.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Transaction>> GetTransactionById(int id)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction == null)
            {
                return NotFound();
            }

            return Ok(transaction);
        }

        [HttpPost]
        public async Task<ActionResult<Transaction>> AddTransaction ([FromBody] Transaction newTransaction)
        {
            if (newTransaction == null)
            {
                return BadRequest();
            }
            _context.Transactions.Add(newTransaction);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTransactionById), new { id = newTransaction.Id}, newTransaction);
        }
    }

}