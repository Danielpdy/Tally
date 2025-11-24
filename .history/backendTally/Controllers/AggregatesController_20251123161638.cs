

using backendTally.Data;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;

namespace backendTally.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AggregatesController : ControllerBase
    {
        private readonly Aggregate

        public class AggregatesController (TallyDbContext context)
        {
            _context = context
        }
    }
}