
using System.Security.Claims;
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
        public async Task<ActionResult<BillPayment>> GetBillPayments()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            int authenticatedUserId = int.Parse(userIdClaim);
            var star
        }

    }
}