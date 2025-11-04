
using Microsoft.EntityFrameworkCore;
using Microsoft.

namespace backendTally.Controllers
{

    private readonly TallyDbConetxt _context;

    public UsersController(TallyDbConetxt context)
    {
        _context = context;
    }
}