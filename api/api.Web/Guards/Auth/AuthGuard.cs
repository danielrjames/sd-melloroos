using api.Domain.Consts.Auth;
using api.Domain.Entities.Auth;
using api.Domain.Entities.User;
using api.Web.Helpers.Exceptions;
using Microsoft.AspNetCore.Identity;

namespace api.Web.Guards.Auth
{
    public static class AuthGuard
    {
        public static void ValidateGrantType(string argument, string argumentName, int statusCode = 400)
        {
            if (argument != GrantType.PASSWORD)
            {
                var message = "Grant Type is not valid.";

                throw new HttpResponseException($"{argumentName}: {message}", statusCode);
            }
        }

        public static void ValidateScope(string argument, string argumentName, int statusCode = 400)
        {
            if (argument != ScopeType.OFFLINE_ACCESS)
            {
                var message = "Scope is not valid.";

                throw new HttpResponseException($"{argumentName}: {message}", statusCode);
            }
        }

        public static void ValidateUser(ApplicationUser? argument, string argumentName, int statusCode = 400)
        {
            if (argument == null)
            {
                var message = "User does not exist.";

                throw new HttpResponseException($"{argumentName}: {message}", statusCode);
            }
        }

        public static void ValidateEmptyUser(ApplicationUser? argument, string argumentName, int statusCode = 400)
        {
            if (argument != null)
            {
                var message = "User already exists.";

                throw new HttpResponseException($"{argumentName}: {message}", statusCode);
            }
        }

        public static void ValidateCreatedUser(IdentityResult argument, string argumentName, int statusCode = 400)
        {
            if (argument != IdentityResult.Success)
            {
                var message = "User was not created.";

                throw new HttpResponseException($"{argumentName}: {message}", statusCode);
            }
        }

        public static void ValidateSignIn(SignInResult argument, string argumentName, int statusCode = 400)
        {
            if (argument != SignInResult.Success)
            {
                var message = "Sign in was not successful.";

                throw new HttpResponseException($"{argumentName}: {message}", statusCode);
            }
        }

        public static void ValidateTokenResponse(TokenResponse? argument, string argumentName, int statusCode = 400)
        {
            if (argument == null)
            {
                var message = "Tokens could not be created.";

                throw new HttpResponseException($"{argumentName}: {message}", statusCode);
            }
        }

        public static Guid ValidateRefreshToken(string argument, string argumentName, int statusCode = 400)
        {
            if (Guid.TryParseExact(argument, "N", out Guid validGuid))
            {
                return validGuid;
            }

            var message = "Refresh token is not a valid Guid.";

            throw new HttpResponseException($"{argumentName}: {message}", statusCode);
        }
    }
}
