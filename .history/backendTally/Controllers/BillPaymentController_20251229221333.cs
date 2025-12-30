
using System.Security.Claims;
using backendTally.Data;
using backendTally.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backendTally.Utils;
using backendTally.Services;

namespace backendTally.Controllers
{
    [Route("api/controller")]
    [ApiController]
    [Authorize]
    public class BillPaymentController : ControllerBase
    {
        private readonly BillPaymentService _billPaymentService;
        public BillPaymentController(BillPaymentService billPaymentService)
        {
            _billPaymentService = billPaymentService;
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
            var startOfWeek = WeekCalculator.GetCurrentWeekStart();
            var endOfWeek = WeekCalculator.GetCurrentWeekEnd();

            var payments = await _billPaymentService


        }

    }
}