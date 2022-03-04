using api.Domain.Entities.Auth;

namespace api.Data.Repositories.Auth
{
    public interface IAuthRepository : IDisposable
    {
        Task<bool> IsActiveClient(int clientId);
        Task<RefreshToken?> GetRefreshToken(Guid tokenId, int clientId);
        Task<bool> AddRefreshToken(RefreshToken refreshToken);
        Task<bool> RemoveRefreshToken(Guid tokenId);
        Task<bool> RemoveRefreshTokenAndExpired(Guid tokenId);
        Task<bool> RemoveRefreshTokensByUserId(Guid userId);
        Task<bool> RemoveExpiredRefreshTokens();
    }
}
