using System.ComponentModel.DataAnnotations;

namespace api.Domain.Entities.Auth
{
    public class AuthClient
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public bool Active { get; set; }
    }
}
