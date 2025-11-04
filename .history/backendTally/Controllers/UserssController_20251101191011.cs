

using Microsoft.AspNetCore.Mvc;

namespace backendTally.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        private readonly backendTallyContext  _context;

        public UsersController(TallyDbConetxt context)
        {
            _context = context;
        }
    }
}