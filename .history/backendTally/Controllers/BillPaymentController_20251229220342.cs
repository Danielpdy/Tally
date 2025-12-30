
using backendTally.Data;
using Microsoft.AspNetCore.Mvc;

namespace backendTally.Controllers
{
    [Route("api/controller")]
    
    public class BillPaymentController : ControllerBase
    {
        private readonly TallyDbContext _context;
        public BillPaymentController(TallyDbContext context)
        {
            _context = context;
        }

    }
}