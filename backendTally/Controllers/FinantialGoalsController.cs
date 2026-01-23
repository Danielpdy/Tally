using System.Security.Claims;
using backendTally.Data;
using backendTally.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


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

        [HttpDelete("Id")]
        public async Task<IActionResult> DeleteGoalById(int Id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;



            return NoContent();
        }
    }
}