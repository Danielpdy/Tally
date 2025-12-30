using backendTally.Data;
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

        public async Task<ActionResult
    }
}