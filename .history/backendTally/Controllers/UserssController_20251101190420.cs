
using 

namespace backendTally.Controllers
{
    public class UsersController : Contro
    private readonly TallyDbConetxt _context;

    public UsersController(TallyDbConetxt context)
    {
        _context = context;
    }
}