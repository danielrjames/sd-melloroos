using api.Domain.Entities.Auth;
using api.Domain.Entities.User;

namespace api.Services.Services.Auth
{
    public interface ITokenService : IDisposable
    {
        Task<TokenResponse?> GetTokensAsync(ApplicationUser user, int clientId, bool rememberMe);
        Task<TokenResponse?> RenewTokensAsync(Guid oldToken, int clientId);
        Task<bool> RevokeTokenAsync(Guid refreshId);
    }
}
