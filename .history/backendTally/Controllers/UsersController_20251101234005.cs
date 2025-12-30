

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
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult<User>> AddUser(User newUser)
        {
            if (newUser == null)
            {
                return BadRequest();
            }
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserById), new { id = newUser.Id }, newUser);

        }

        [HttpPut]
        public a

    }
}