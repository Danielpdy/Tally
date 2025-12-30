using System.Security.Claims;
using backendTally.Data;
using backendTally.Models;
using Microsoft.AspNetCore.Mvc;

namespace backendTally.Services
{
    public class BillPaymentService 
    {
        private readonly TallyDbContext _context;
        public BillPaymentService(TallyDbContext context)
        {
            _context = context;
        }

        public async Task<List<BillPayment>> GetPaymentsForWeek(int userId, DateTime startOfWeek, DateTime endOfWeek)
        {
            return await _context.BillPayments
                .Where(bp => bp.UserId = userId && bp.PaidDate >= startOfWeek &&)
        }
    }
}