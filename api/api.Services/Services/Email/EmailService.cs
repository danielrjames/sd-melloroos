using api.Domain.Entities.User;

namespace api.Services.Services.Email
{
    public class EmailService : IEmailService
    {
        public async Task<bool> SendEmailConfirmationAsync(ApplicationUser user, string token)
        {
            //var encodedToken = HttpUtility.UrlEncode(token);
            //var link = string.Format(_domainConfig.Url + "/password-change?id={0}&code={1}", user.Id.ToString(), encodedToken);
            //var preheader = "Hi " + recipientName + ", it looks like you requested to reset your password. To do so, click the link inside.";

            //var msg = new TemplatedPostmarkMessage
            //{
            //    TemplateAlias = TemplateAlias.PasswordReset,
            //    From = _emailConfig.SupportName + " " + _emailConfig.SupportAddress,
            //    TemplateModel = new DefaultEmail
            //    {
            //        ProductUrl = _domainConfig.Url,
            //        ProductName = _domainConfig.Name,
            //        Name = recipientName,
            //        ActionUrl = link,
            //        PreheaderText = preheader
            //    }
            //};

            //return await ExecuteTemplate(recipientEmail, msg);

            return await Task.FromResult(true);
        }

        public async Task<bool> SendPasswordResetAsync(ApplicationUser user, string token)
        {
            //var encodedToken = HttpUtility.UrlEncode(token);
            //var link = string.Format(_domainConfig.Url + "/password-change?id={0}&code={1}", user.Id.ToString(), encodedToken);
            //var preheader = "Hi " + recipientName + ", it looks like you requested to reset your password. To do so, click the link inside.";

            //var msg = new TemplatedPostmarkMessage
            //{
            //    TemplateAlias = TemplateAlias.PasswordReset,
            //    From = _emailConfig.SupportName + " " + _emailConfig.SupportAddress,
            //    TemplateModel = new DefaultEmail
            //    {
            //        ProductUrl = _domainConfig.Url,
            //        ProductName = _domainConfig.Name,
            //        Name = recipientName,
            //        ActionUrl = link,
            //        PreheaderText = preheader
            //    }
            //};

            //return await ExecuteTemplate(recipientEmail, msg);

            return await Task.FromResult(true);
        }
    }
}
