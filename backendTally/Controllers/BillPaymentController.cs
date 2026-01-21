
using System.Security.Claims;
using backendTally.Data;
using backendTally.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backendTally.Utils;
using backendTally.Services;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks.Dataflow;
using backendTally.DTOs;

namespace backendTally.Controllers
{
    [Route("api/[controller]")]
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
            var now = DateTime.UtcNow;
            var startOfMonth = new DateTime(now.Year, now.Month, 1);
            var endOfMonth = startOfMonth.AddMonths(1).AddDays(-1);

            var payments = await _billPaymentService.GetPaymentsForWeek(authenticatedUserId, startOfMonth, endOfMonth);

            return Ok(new { payments });

        }

        [HttpPost]
        public async Task<ActionResult<BillPayment>> AddNewBillPayment([FromBody] NewBillPaymentDto dto)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            int authenticatedUserId = int.Parse(userIdClaim);

            try
            {
                var payment = await _billPaymentService.MarkBillAsPaid(authenticatedUserId, dto.RecurringBillId, dto.PaidDate);
                
                return Ok( new { payment, message = "Bill marked as paid"});
                
            } catch(Exception ex)
            {
                return StatusCode(500, new { message = ex.Message});
            }
        }

        [HttpDelete("{recurringBillId}")]
        public async Task<IActionResult> DeleteBillPaymentById(int recurringBillId)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            int authenticatedUserId = int.Parse(userIdClaim);

            await _billPaymentService.UnmarkBillAsPaid(authenticatedUserId, recurringBillId);
            
            return NoContent();
        }

    }
}