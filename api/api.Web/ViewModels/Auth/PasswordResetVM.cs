using System.ComponentModel.DataAnnotations;

namespace api.Web.ViewModels.Auth
{
    public class PasswordResetVM
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required]
        public int ClientId { get; set; }
    }
}
