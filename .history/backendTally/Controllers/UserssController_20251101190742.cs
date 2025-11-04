

using Microsoft.AspNetCore.Mvc;

namespace backendTally.Controllers
{
    [Route]
    public class UsersController : ControllerBase
    {

        private readonly TallyDbConetxt _context;

        public UsersController(TallyDbConetxt context)
        {
            _context = context;
        }
    }
}