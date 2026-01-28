
// Required NuGet packages:
// - System.IdentityModel.Tokens.Jwt (for creating and handling JWT tokens)
// - Microsoft.IdentityModel.Tokens (for security key and signing credentials)
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace backendTally.Services
{
    
    public class JwtService
    {
        // Inject IConfiguration to access appsettings.json values
        // This gives us access to JWT:Key, JWT:Issuer, JWT:Audience, JWT:ExpiryInMinutes
        private readonly IConfiguration _configuration;

        public JwtService (IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GenerateToken(User user)
        {
            // STEP 1: Define Claims (user information embedded in the token)
            // Claims are key-value pairs that describe the user
            // WARNING: Don't put sensitive data here - claims are base64 encoded, NOT encrypted
            var claims = new[]
            {
                // Sub (Subject): Primary user identifier - used for data scoping
                // This is what you'll extract in controllers to filter data by user
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),

                // Email: User's email address - useful for display or business logic
                new Claim(JwtRegisteredClaimNames.Email ,user.Email),

                // Name: User's display name - useful for UI personalization
                new Claim(JwtRegisteredClaimNames.Name, user.Name),

                // Jti (JWT ID): Unique identifier for THIS specific token
                // Prevents replay attacks and useful for token revocation
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            // STEP 2: Create the symmetric security key from the secret in appsettings.json
            // This key is used to SIGN the token (proves it came from your server)
            // CRITICAL: Keep this key secret! Minimum 32 characters for HS256 algorithm
            // Convert string to byte array using UTF8 encoding
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!)
            );

            // STEP 3: Create signing credentials
            // Combines the secret key with a cryptographic algorithm
            // HmacSha256 (HS256) is the industry standard for JWT signing
            // This creates the "signature" part of the JWT (third part after the dots)
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // STEP 4: Define token properties using SecurityTokenDescriptor
            // This is the blueprint for your token - describes all its characteristics
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                // Subject: The user's identity with all their claims
                // This becomes the "payload" (second part) of the JWT
                Subject = new ClaimsIdentity(claims),

                // Expires: Absolute expiration time (ALWAYS use UtcNow, never DateTime.Now)
                // After this time, the token is automatically rejected by validation middleware
                // Balance security (shorter = more secure) vs UX (longer = less re-login)
                Expires = DateTime.UtcNow.AddMinutes(
                    Convert.ToDouble(_configuration["Jwt:ExpiryInMinutes"])
                ),

                // Issuer: Who created this token (your backend API)
                // Validated in Program.cs TokenValidationParameters to prevent token forgery
                Issuer = _configuration["Jwt:Issuer"],

                // Audience: Who this token is intended for (your frontend app)
                // Prevents tokens meant for one app being used in another
                Audience = _configuration["Jwt:Audience"],

                // SigningCredentials: The cryptographic signature we created in STEP 3
                // Ensures token integrity - any modification breaks the signature
                SigningCredentials = creds
            };

            // STEP 5: Create the actual token
            // JwtSecurityTokenHandler is a factory for creating and reading tokens
            // CreateToken() serializes claims, encodes header/payload, and generates signature
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            // STEP 6: Convert token object to string format
            // WriteToken() produces the final JWT string: header.payload.signature
            // This is what you send to the client and what they include in Authorization headers
            return tokenHandler.WriteToken(token);
        }
    }
}