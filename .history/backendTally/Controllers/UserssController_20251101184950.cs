
using Microsoft.EntityFrameworkCore

namespace backendTally.Controllers
{

    private readonly TallyDbConetxt _context;

    public UsersController(TallyDbConetxt context)
    {
        _context = context;
    }
}