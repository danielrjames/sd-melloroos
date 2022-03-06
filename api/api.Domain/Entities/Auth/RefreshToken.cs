using api.Domain.Entities.User;
using System.ComponentModel.DataAnnotations;

namespace api.Domain.Entities.Auth
{
    public class RefreshToken
    {
        [Key]
        public Guid Id { get; set; }
        public DateTime IssuedUtc { get; set; }
        public DateTime ExpiresUtc { get; set; }

        public int ClientId { get; set; }
        public AuthClient Client { get; set; } = null!;

        public Guid UserId { get; set; }
        public ApplicationUser User { get; set; } = null!;
    }
}
