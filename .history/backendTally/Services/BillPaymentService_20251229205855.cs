using backendTally.Data;

namespace backendTally.Services
{
    public class BillPaymentService
    {
        private readonly TallyDbContext _context;
        public Bil(TallyDbContext context)
        {
            _context = context;
        }
    }
}