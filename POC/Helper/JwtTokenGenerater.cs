using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Http;

namespace POC.Helpers
{
    public class JwtTokenGenerator
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public JwtTokenGenerator(IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
        }

        public string GenerateToken()
        {
            HttpContext context = _httpContextAccessor.HttpContext!;

            string secretKey = _configuration["JwtSettings:SecretKey"] ?? throw new InvalidOperationException("JWT secret key is not configured.");
            string issuer = _configuration["JwtSettings:Issuer"] ?? throw new InvalidOperationException("JWT issuer is not configured.");
            string audience = _configuration["JwtSettings:Audience"] ?? throw new InvalidOperationException("JWT audience is not configured.");

            if (secretKey is null)
            {
                throw new InvalidOperationException("JWT secret key is not configured.");
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = issuer,
                Audience = audience,
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // Set the token as an HTTP-only cookie in the response
            context.Response.Cookies.Append("Token", tokenString, new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.Strict,
                Secure = true  // Enable this option if using HTTPS
            });

            return tokenString;
        }
    }
}
