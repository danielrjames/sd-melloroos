using System.ComponentModel.DataAnnotations;

namespace api.Web.ViewModels.Auth
{
    public class LoginVM
    {
        [Required]
        [EmailAddress]
        [MaxLength(250)]
        public string Email { get; set; } = string.Empty;
        [Required]
        [MaxLength(250)]
        public string Password { get; set; } = string.Empty;
        [Required]
        public int ClientId { get; set; }
        [Required]
        public string GrantType { get; set; } = string.Empty;
        [Required]
        public string Scope { get; set; } = string.Empty;
        public bool RememberMe { get; set; }
    }
}
