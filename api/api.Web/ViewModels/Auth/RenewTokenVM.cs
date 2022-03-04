using System.ComponentModel.DataAnnotations;

namespace api.Web.ViewModels.Auth
{
    public class RenewTokenVM
    {
        [Required]
        public string RefreshToken { get; set; } = string.Empty;
        [Required]
        public int ClientId { get; set; }
        [Required]
        public string GrantType { get; set; } = string.Empty;
        [Required]
        public string Scope { get; set; } = string.Empty;
    }
}
