using api.Data.Repositories.Auth;
using api.Domain.Consts.Auth;
using api.Domain.Entities.Auth;
using api.Domain.Entities.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace api.Services.Services.Auth
{
    public class TokenService : ITokenService
    {
        private readonly IAuthRepository _repo;
        private readonly TokenConfig _tokenConfig;
        private readonly UserManager<ApplicationUser> _userManager;

        public TokenService(
            IAuthRepository repo,
            IOptions<TokenConfig> tokenConfig,
            UserManager<ApplicationUser> userManager
        )
        {
            _repo = repo;
            _tokenConfig = tokenConfig.Value;
            _userManager = userManager;
        }

        public async Task<TokenResponse?> GetTokensAsync(ApplicationUser user, int clientId, bool rememberMe)
        {
            var validClient = await IsValidClient(clientId);

            if (!validClient)
            {
                return null;
            }

            var now = DateTime.UtcNow;
            var jwtExpiration = TimeSpan.FromHours(_tokenConfig.JwtExpiration);
            var refreshExpiration = rememberMe ? TimeSpan.FromDays(_tokenConfig.RememberMeExpiration) : TimeSpan.FromDays(_tokenConfig.RefreshExpiration);

            var accessToken = CreateJwtToken(user, now, jwtExpiration, refreshExpiration);
            var refreshToken = await CreateRefreshToken(user, clientId, now, refreshExpiration);

            if (refreshToken == null)
            {
                return null;
            }

            var response = new TokenResponse
            {
                AccessToken = accessToken,
                TokenType = TokenType.BEARER,
                Expiration = (int)jwtExpiration.TotalSeconds,
                RefreshToken = refreshToken
            };

            return response;
        }

        public async Task<TokenResponse?> RenewTokensAsync(Guid oldToken, int clientId)
        {
            var token = await _repo.GetRefreshToken(oldToken, clientId);

            if (token == null || token?.User == null)
            {
                return null;
            }

            var removeResult = await _repo.RemoveRefreshToken(token.Id);

            if (!removeResult)
            {
                return null;
            }

            bool rememberMe = token.IssuedUtc.Date.AddDays(_tokenConfig.RememberMeExpiration) == token.ExpiresUtc.Date;

            return await GetTokensAsync(token.User, clientId, rememberMe);
        }

        public async Task<bool> RevokeTokenAsync(Guid refreshId)
        {
            return await _repo.RemoveRefreshTokenAndExpired(refreshId);
        }

        private async Task<bool> IsValidClient(int clientId)
        {
            var isActive = await _repo.IsActiveClient(clientId);

            return isActive;
        }

        private string CreateJwtToken(ApplicationUser user, DateTime now, TimeSpan expiration, TimeSpan refreshExpiration)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_tokenConfig.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var jwtClaims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, new DateTimeOffset(now).ToUniversalTime().ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtCustomClaimName.FIRST_NAME, user.FirstName, ClaimValueTypes.String),
                new Claim(JwtCustomClaimName.LAST_NAME, user.LastName, ClaimValueTypes.String),
                new Claim(JwtCustomClaimName.EMAIL_CONFIRMED, user.EmailConfirmed.ToString(), ClaimValueTypes.Boolean),
                new Claim(JwtCustomClaimName.REFRESH_TOKEN_EXPIRATION, new DateTimeOffset(now).ToUniversalTime().Add(refreshExpiration).ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64),
            };

            var token = new JwtSecurityToken(
                issuer: _tokenConfig.Issuer,
                audience: _tokenConfig.Audience,
                claims: jwtClaims,
                notBefore: now,
                expires: now.Add(expiration),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private async Task<string?> CreateRefreshToken(ApplicationUser user, int clientId, DateTime now, TimeSpan expiration)
        {
            var refreshToken = new RefreshToken
            {
                Id = Guid.NewGuid(),
                ClientId = clientId,
                IssuedUtc = now,
                ExpiresUtc = now.Add(expiration),
                UserId = user.Id
            };

            var result = await _repo.AddRefreshToken(refreshToken);

            if (!result)
            {
                return null;
            }

            user.LastLoginUTC = now;

            var userResult = await _userManager.UpdateAsync(user);

            return userResult.Succeeded ? refreshToken.Id.ToString("N") : null;
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    _repo.Dispose();
                }
            }
            disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
