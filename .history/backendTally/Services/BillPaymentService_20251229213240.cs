using System.Security.Claims;
using backendTally.Data;
using backendTally.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
                .Where(bp => bp.UserId == userId && bp.PaidDate >= startOfWeek && bp.PaidDate <= endOfWeek)
                .ToListAsync();
        }

        public async Task<BillPayment> MarkBillAsPaid(int userId, int recurringBillId, DateTime paidDate)
        {
            var existing = await _context.BillPayments
                .Where(eb => eb.UserId == userId && eb.RecurringBillId == recurringBillId && eb.PaidDate == paidDate)
                .FirstOrDefaultAsync();
            
            if (existing != null)
            {
                return ""
            }
        }
    }
}