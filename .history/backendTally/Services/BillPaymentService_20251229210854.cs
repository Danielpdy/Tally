using System.Security.Claims;
using backendTally.Data;
using backendTally.Models;
using Microsoft.AspNetCore.Mvc;

namespace backendTally.Services
{
    public class BillPaymentService : coNTROLL
    {
        private readonly TallyDbContext _context;
        public BillPaymentService(TallyDbContext context)
        {
            _context = context;
        }

        public async Task<List<BillPayment>> GetPaymentsForWeek()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }
    }
}