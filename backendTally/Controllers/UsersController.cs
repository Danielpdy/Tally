

using System.Diagnostics.Eventing.Reader;
using backendTally.Data;
using backendTally.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backendTally.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;

namespace backendTally.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly TallyDbContext _context;
        private readonly JwtService _jwtService;
        public UsersController(TallyDbContext context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

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
                PasswordHash = hash,
                PhoneNumber = dto.PhoneNumber
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok( new
            {
                user.Id,
                user.Email,
                user.Name,
                user.PhoneNumber,
                user.CreatedAt
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login ([FromBody] LoginDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Email) ||
                string.IsNullOrWhiteSpace(dto.Password))
            {
                return BadRequest("Email and password are required.");
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user is null) return Unauthorized("Invalid email or password");

            bool valid = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);
            if (!valid) return Unauthorized("Invalid email or password");

            var token = _jwtService.GenerateToken(user);
            var refreshToken = _jwtService.GenerateRefreshToken();
            
            _context.RefreshTokens.Add(new RefreshToken
            {
                Token = refreshToken,
                UserId = user.Id,
                ExpirestAt = DateTime.UtcNow.AddDays(1),
                CreatedAt = DateTime.UtcNow,
                IsRevoked = false
            });
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Login succesful",
                user = new { user.Id, user.Email, user.Name, token },
                refreshToken,
                expiresIn = 900
            });
        }

        [HttpPost("refresh")]
        [AllowAnonymous]
        public async Task<IActionResult> Refresh([FromBody] RefreshRequest request)
        {
            var storedToken = await _context.RefreshTokens
                .Include(r => r.User)
                .FirstOrDefaultAsync(r => r.Token == request.RefreshToken);

            if (storedToken == null || storedToken.IsRevoked || storedToken.ExpirestAt < DateTime.UtcNow)
                return Unauthorized("Invalid or expired refresh token");
            
            storedToken.IsRevoked = true;

            var newAccessToken = _jwtService.GenerateToken(storedToken.User);
            var newRefreshToken = _jwtService.GenerateRefreshToken();

            _context.RefreshTokens.Add(new RefreshToken
            {
                Token = newRefreshToken,
                UserId = storedToken.UserId,
                ExpirestAt = DateTime.UtcNow.AddDays(1),
                CreatedAt = DateTime.UtcNow,
                IsRevoked = false
            });

            await _context.SaveChangesAsync();

            // Clean up old expired/revoked tokens for this user
            await _context.RefreshTokens
                .Where(r => r.UserId == storedToken.UserId
                    && (r.IsRevoked || r.ExpirestAt < DateTime.UtcNow))
                .ExecuteDeleteAsync();

            return Ok(new
            {
                token = newAccessToken,
                expiresIn = 900,
                refreshToken = newRefreshToken
            });
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