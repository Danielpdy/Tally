
using System.Security.Claims;
using backendTally.Data;
using backendTally.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backendTally.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class BudgetGoalsController : ControllerBase
    {
        private readonly TallyDbContext _context;

        public BudgetGoalsController(TallyDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<BudgetGoal>> GetBudgetGoals()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            int authenticatedUserId = int.Parse(userIdClaim);

            var daysLeft = CalculateDaysLeft();

            var budgetGoals = await _context.BudgetGoals
                .Where(bg => bg.UserId == authenticatedUserId)
                .FirstOrDefaultAsync();

            return Ok( new
            {
                BudgetGoal = budgetGoals,
                DaysLeft = daysLeft
            });
        }

        [HttpPost]
        public async Task<ActionResult<BudgetGoal>> AddBudgetGoal([FromBody] BudgetGoal newBudgetGoal)
        {
            if (newBudgetGoal == null)
            {
                return BadRequest();
            }

            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            var authenticatedUserId = int.Parse(userIdClaim);
            newBudgetGoal.UserId = authenticatedUserId;

            _context.BudgetGoals.Add(newBudgetGoal);
            await _context.SaveChangesAsync();

            return Ok(newBudgetGoal);
        }

        [HttpPatch]
        public async Task<ActionResult<BudgetGoal>> UpdateBudgetGoal([FromBody] BudgetDataUpdateDto dto)
        {
            if (BudgetDataUpdateDto == null)
            {
                return BadRequest();
            }
        }

        private DateTime GetCurrentWeekStart()
        {
            var today = DateTime.UtcNow.Date;
            int daysFromMonday = ((int)today.DayOfWeek - (int)DayOfWeek.Monday + 7) % 7;
            return today.AddDays(-daysFromMonday);
        }

        private DateTime GetCurrentWeekEnd()
        {
            return GetCurrentWeekStart().AddDays(6);
        }

        private int CalculateDaysLeft()
        {
            var today = DateTime.UtcNow.Date;
            var endOfWeek = GetCurrentWeekEnd();
            var daysLeft = (endOfWeek - today).Days;
            return Math.Max(0, daysLeft);
        }
    }
}