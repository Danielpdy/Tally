
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore

namespace backendTally.Controllers
{

    private readonly TallyDbConetxt _context;

    public UsersController(TallyDbConetxt context)
    {
        _context = context;
    }
}