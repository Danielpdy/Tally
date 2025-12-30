
using backendTally.Data;
using backendTally.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backendTally.Controllers
{
    [Route("api/controller")]
    [ApiController]
    [Authorize]
    public class BillPaymentController : ControllerBase
    {
        private readonly TallyDbContext _context;
        public BillPaymentController(TallyDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<BillPayment>> Get

    }
}