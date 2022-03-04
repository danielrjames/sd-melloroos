using api.Web.Helpers.Exceptions;

namespace api.Web.Guards.Email
{
    public static class EmailGuard
    {
        public static void ValidateEmailResult(bool argument, string argumentName, int statusCode = 400)
        {
            if (argument != true)
            {
                var message = "Email failed to send.";

                throw new HttpResponseException($"{argumentName}: {message}", statusCode);
            }
        }
    }
}
