using System.ComponentModel.DataAnnotations;

namespace api.Web.ViewModels.Auth
{
    public class RegisterVM
    {
        [Required]
        [EmailAddress]
        [MaxLength(250)]
        public string Email { get; set; } = string.Empty;
        [Required]
        [MaxLength(250)]
        public string Password { get; set; } = string.Empty;
        [Required]
        [MaxLength(250)]
        public string FirstName { get; set; } = string.Empty;
        [Required]
        [MaxLength(250)]
        public string LastName { get; set; } = string.Empty;
        [Required]
        public int ClientId { get; set; }
        [Required]
        public string GrantType { get; set; } = string.Empty;
        public string Scope { get; set; } = string.Empty;
    }
}
