using System.Security.Claims;
using backendTally.Data;
using backendTally.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;


namespace backendTally.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FinantialGoalsController : ControllerBase
    {
        private readonly TallyDbContext _context;
        public FinantialGoalsController(TallyDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task <ActionResult<FinantialGoal>> GetFinantialGoals()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            int authenticatedUserId = int.Parse(userIdClaim);

            var finantialGoals = await _context.FinantialGoals
                .Where(fg => fg.UserId == authenticatedUserId)
                .ToListAsync();
            
            if (finantialGoals == null)
            {
                return NotFound();
            }

            return Ok(finantialGoals);
        }

        [HttpPost]
        public async Task<ActionResult<FinantialGoal>> CreateFinantialGoal([FromBody] FinantialGoal finantialGoal)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            int authenticatedUserId = int.Parse(userIdClaim);

            finantialGoal.UserId = authenticatedUserId;
            finantialGoal.CreatedAt = DateTime.UtcNow;
            finantialGoal.UpdatedAt = DateTime.UtcNow;

            _context.FinantialGoals.Add(finantialGoal);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFinantialGoals), new { id = finantialGoal.Id }, finantialGoal);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFinantialGoal(int id, [FromBody] FinantialGoal updatedGoal)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            int authenticatedUserId = int.Parse(userIdClaim);

            var existingGoal = await _context.FinantialGoals
                .FirstOrDefaultAsync(g => g.Id == id && g.UserId == authenticatedUserId);

            if (existingGoal == null)
            {
                return NotFound();
            }

            existingGoal.Name = updatedGoal.Name;
            existingGoal.TargetAmount = updatedGoal.TargetAmount;
            existingGoal.CurrentAmount = updatedGoal.CurrentAmount;
            existingGoal.DueDate = updatedGoal.DueDate;
            existingGoal.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(existingGoal);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGoalById(int id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            int authenticatedUserId = int.Parse(userIdClaim);

            var deletedGoal = await _context.FinantialGoals
                .FirstOrDefaultAsync(g => g.Id == id && g.UserId == authenticatedUserId);

            if (deletedGoal == null)
            {
                return NotFound();
            }

            _context.FinantialGoals.Remove(deletedGoal);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}