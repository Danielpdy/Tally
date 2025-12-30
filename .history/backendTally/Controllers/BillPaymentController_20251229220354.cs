
using backendTally.Data;
using Microsoft.AspNetCore.Mvc;

namespace backendTally.Controllers
{
    [Route("api/controller")]
    [ApiController]
    [Auth]
    public class BillPaymentController : ControllerBase
    {
        private readonly TallyDbContext _context;
        public BillPaymentController(TallyDbContext context)
        {
            _context = context;
        }

    }
}