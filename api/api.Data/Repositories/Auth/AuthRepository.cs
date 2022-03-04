using api.Data.Contexts;
using api.Domain.Entities.Auth;
using Microsoft.EntityFrameworkCore;

namespace api.Data.Repositories.Auth
{
    public class AuthRepository : IAuthRepository
    {
        private readonly ApplicationDbContext _context;

        public AuthRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        // Client
        public async Task<bool> IsActiveClient(int clientId)
        {
            return await _context.AuthClients.FirstOrDefaultAsync(c => c.Id == clientId && c.Active == true) != null;
        }

        // Refresh Tokens
        public async Task<RefreshToken?> GetRefreshToken(Guid tokenId, int clientId)
        {
            return await _context.RefreshTokens
                .Where(t => t.Id == tokenId && t.ClientId == clientId && t.ExpiresUtc <= DateTime.UtcNow)
                .Include(t => t.User)
                .FirstOrDefaultAsync();
        }

        public async Task<bool> AddRefreshToken(RefreshToken refreshToken)
        {
            _context.Add(refreshToken);

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> RemoveRefreshToken(Guid tokenId)
        {
            var token = await _context.RefreshTokens.FirstOrDefaultAsync(t => t.Id == tokenId);

            if (token != null)
            {
                _context.RefreshTokens.Remove(token);

                return await _context.SaveChangesAsync() > 0;
            }

            return false;
        }

        public async Task<bool> RemoveRefreshTokenAndExpired(Guid tokenId)
        {
            var tokens = await _context.RefreshTokens
                .Where(t => t.Id == tokenId || t.ExpiresUtc < DateTime.UtcNow)
                .ToListAsync();

            if (tokens.Count > 0)
            {
                _context.RefreshTokens.RemoveRange(tokens);

                return await _context.SaveChangesAsync() > 0;
            }

            return false;
        }

        public async Task<bool> RemoveRefreshTokensByUserId(Guid userId)
        {
            var tokens = await _context.RefreshTokens
                .Where(t => t.UserId == userId)
                .ToListAsync();

            if (tokens.Count > 0)
            {
                _context.RefreshTokens.RemoveRange(tokens);

                return await _context.SaveChangesAsync() > 0;
            }

            return false;
        }

        public async Task<bool> RemoveExpiredRefreshTokens()
        {
            var tokens = await _context.RefreshTokens
                .Where(t => t.ExpiresUtc < DateTime.UtcNow)
                .ToListAsync();

            if (tokens.Count > 0)
            {
                _context.RefreshTokens.RemoveRange(tokens);

                return await _context.SaveChangesAsync() > 0;
            }

            return false;
        }

        // GC
        private bool disposed = false;
        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
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
