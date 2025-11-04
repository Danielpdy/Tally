

using System.Diagnostics.Eventing.Reader;
using backendTally.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backendTally.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly TallyDbContext _context;
        public UsersController(TallyDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            return Ok(await _context.Users.ToListAsync());
        }

        [HttpGet("id")]
        public async Task<ActionResult<User>> GetUserById( int id)
        {
            var user = users.FirstOrDefault(x => x.Id == id);
            if (user == null)
                return NotFound();

                
        }

    }
}