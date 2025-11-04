

using backendTally.Data;
using Microsoft.AspNetCore.Mvc;

namespace backendTally.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly TallyDbContext _context;
        public UsersController(TallyDbContext context)
        [HttpGet]
        
    }
}