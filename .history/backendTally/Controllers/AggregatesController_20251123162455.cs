

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
            int userId = 1;

            var summary = await _aggregateService.GetWeeklySummary(userId)             ;

            return Ok
        }
    }
}