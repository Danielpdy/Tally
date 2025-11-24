

using backendTally.Data;
using backendTally.Services;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;

namespace backendTally.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AggregatesController : ControllerBase
    {
        private readonly AggregateService _aggregateService;

        public class AggregatesController (AggregateService aggregateService)
        {
            _
        }
    }
}