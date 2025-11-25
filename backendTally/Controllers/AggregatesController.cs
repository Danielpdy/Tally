

using System.Security.Claims;
using backendTally.Data;
using backendTally.Services;
using Microsoft.AspNetCore.Mvc;

namespace backendTally.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AggregatesController : ControllerBase
    {
        private readonly AggregateService _aggregateService;

        public  AggregatesController (AggregateService aggregateService)
        {
            _aggregateService = aggregateService;
        }

        [HttpGet("weekly-summary")]
        public async Task<ActionResult<List<object>>> GetWeeklySummary()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
            {
                return Unauthorized();
            }
            
            var authenticatedUserId = int.Parse(userIdClaim);

            var summary = await _aggregateService.GetWeeklySummary(authenticatedUserId)             ;

            return Ok(summary);
        }
    }
}