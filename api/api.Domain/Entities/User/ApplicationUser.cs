using api.Domain.Entities.Auth;
using Microsoft.AspNetCore.Identity;

namespace api.Domain.Entities.User
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public int ClusterId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public DateTime CreatedUTC { get; set; }
        public DateTime LastLoginUTC { get; set; }
        public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
    }
}
