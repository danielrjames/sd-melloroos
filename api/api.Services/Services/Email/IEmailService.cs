using api.Domain.Entities.User;

namespace api.Services.Services.Email
{
    public interface IEmailService
    {
        public Task<bool> SendEmailConfirmationAsync(ApplicationUser user, string token);
        public Task<bool> SendPasswordResetAsync(ApplicationUser user, string token);
    }
}
