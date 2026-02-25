

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
        private readonly EmailService _emailService;
        public UsersController(TallyDbContext context, JwtService jwtService, EmailService emailService)
        {
            _context = context;
            _jwtService = jwtService;
            _emailService = emailService;
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
                PhoneNumber = dto.PhoneNumber,
                TermsAgreedAt = dto.TermsAgreedAt ?? DateTime.UtcNow
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
            if (user is null || user.IsDeleted) return Unauthorized("Invalid email or password");

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

        [HttpPost("forgot-password")]
        [AllowAnonymous]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (user != null)
            {
                var token = _jwtService.GenerateRefreshToken();

                _context.PasswordResetTokens.Add(new PasswordResetToken
                {
                    Token = token,
                    UserId = user.Id,
                    ExpiresAt = DateTime.UtcNow.AddMinutes(15),
                    IsUsed = false
                });
                await _context.SaveChangesAsync();

                var resetLink = $"http://localhost:3000/reset-password?token={Uri.EscapeDataString(token)}";
                await _emailService.SendEmailAsync(
                    user.Email,
                    "Reset your Tally password",
                    $"<p>Click <a href='{resetLink}'>here</a> to reset your password.</p>"
                );
            }

            return Ok(new { message = "If that email exists, a reset link has been sent." });
        }

        [HttpPost("reset-password")]
        [AllowAnonymous]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto dto)
        {
            var resetToken = await _context.PasswordResetTokens
                .Include(r => r.User)
                .FirstOrDefaultAsync(r => r.Token == dto.Token);

            if (resetToken == null || resetToken.IsUsed || resetToken.ExpiresAt < DateTime.UtcNow)
                return BadRequest("Invalid or expired reset token");
            
            resetToken.User.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            _context.PasswordResetTokens.Remove(resetToken);
            await _context.SaveChangesAsync();

            await _context.PasswordResetTokens
                .Where(r => r.UserId == resetToken.UserId)
                .ExecuteDeleteAsync();

            return Ok(new { message = "Password has been reset" });
        }

        [HttpGet("oauth/check")]
        [AllowAnonymous]
        public async Task<IActionResult> CheckOAuthUser([FromQuery] string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return BadRequest("Email is required.");

            var exists = await _context.Users.AnyAsync(u => u.Email == email && !u.IsDeleted);
            return Ok(new { exists });
        }

        [HttpPost("oauth")]
        [AllowAnonymous]
        public async Task<IActionResult> OAuthLogin([FromBody] OAuthLoginDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.Name))
                return BadRequest("Email and name are required.");

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (user != null && user.IsDeleted)
                return Unauthorized("Account has been deactivated");

            if (user == null)
            {
                user = new User
                {
                    Email = dto.Email,
                    Name = dto.Name,
                    PasswordHash = "",
                    TermsAgreedAt = dto.TermsAgreedAt ?? DateTime.UtcNow
                };
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
            }

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
                user = new { user.Id, user.Email, user.Name, token },
                refreshToken,
                expiresIn = 900
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUserDto dto)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            if (!string.IsNullOrWhiteSpace(dto.Name)) user.Name = dto.Name;
            if (!string.IsNullOrWhiteSpace(dto.Email))
            {
                bool emailTaken = await _context.Users.AnyAsync(u => u.Email == dto.Email && u.Id != id);
                if (emailTaken) return Conflict("Email already in use.");
                user.Email = dto.Email;
            }
            if (dto.PhoneNumber != null) user.PhoneNumber = dto.PhoneNumber;

            await _context.SaveChangesAsync();

            return Ok(new { user.Id, user.Name, user.Email, user.PhoneNumber });
        }

        [HttpPut("{id}/password")]
        public async Task<IActionResult> ChangePassword(int id, [FromBody] ChangePasswordDto dto)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            bool valid = BCrypt.Net.BCrypt.Verify(dto.CurrentPassword, user.PasswordHash);
            if (!valid) return BadRequest("Current password is incorrect");

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Password updated" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            user.IsDeleted = true;
            user.DeletedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Account has been deactivated" });
        }

    }
}