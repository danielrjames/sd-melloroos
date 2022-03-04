using System.ComponentModel.DataAnnotations;

namespace api.Web.ViewModels.Auth
{
    public class RevokeTokenVM
    {
        [Required]
        public string RefreshToken { get; set; } = string.Empty;
        [Required]
        public int ClientId { get; set; }
    }
}
