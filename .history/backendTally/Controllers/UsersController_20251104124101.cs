

using System.Diagnostics.Eventing.Reader;
using backendTally.Data;
using backendTally.DTOs;
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

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            return Ok(user);
        }

        /* [HttpPost] 
         public async Task<ActionResult<User>> AddUser(User newUser)
         {
             if (newUser == null)
             {
                 return BadRequest();
             }
             _context.Users.Add(newUser);
             await _context.SaveChangesAsync();

             return CreatedAtAction(nameof(GetUserById), new { id = newUser.Id }, newUser);

         }*/

        [HttpPost("signup")]
        public async Task<ActionResult<User>> SignUp([FromBody] SignupDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Email) ||
            string.IsNullOrWhiteSpace(dto.Name) ||
            string.IsNullOrWhiteSpace(dto.Password))
            {
                return BadRequest("Email, name, and password are required.");
            }

            bool exists = await _context.Users.AnyAsync(u => u.Email == dto.Email);
            if (exists) return Conflict("Email already registered.");

            string hash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            var user = new User
            {
                Email = dto.Email,
                Name = dto.Name,
                PasswordHash = hash
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, new
            {
                user.Id,
                user.Email,
                user.Name,
                user.CreatedAt
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login ([FromBody] LoginDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Email) ||
                string.IsNullOrWhiteSpace(dto.Password))
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, User updatedUser)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            user.Id = updatedUser.Id;
            user.Name = updatedUser.Name;
            user.Email = updatedUser.Email;
            user.PasswordHash = updatedUser.PasswordHash;
            user.PhoneNumber = updatedUser.PhoneNumber;
            user.CreatedAt = updatedUser.CreatedAt;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}