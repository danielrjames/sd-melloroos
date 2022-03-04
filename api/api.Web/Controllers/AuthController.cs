using api.Domain.Entities.User;
using api.Services.Services.Auth;
using api.Services.Services.Email;
using api.Web.Guards.Auth;
using api.Web.Guards.Email;
using api.Web.ViewModels.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;

namespace api.Web.Controllers
{
    [AllowAnonymous]
    [Route("auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IEmailService _emailService;

        public AuthController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ITokenService tokenService,
            IEmailService emailService
        )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _emailService = emailService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterVM vm)
        {
            AuthGuard.ValidateGrantType(vm.GrantType, nameof(vm.GrantType));

            AuthGuard.ValidateScope(vm.Scope, nameof(vm.Scope));

            var userEmail = vm.Email.ToLower();

            var existingUser = await _userManager.FindByEmailAsync(userEmail);

            AuthGuard.ValidateEmptyUser(existingUser, nameof(existingUser));

            var now = DateTime.UtcNow;

            var user = new ApplicationUser
            {
                UserName = userEmail,
                Email = userEmail,
                FirstName = vm.FirstName,
                LastName = vm.LastName,
                CreatedUTC = now,
                LastLoginUTC = now,
            };

            var userResult = await _userManager.CreateAsync(user, vm.Password);

            AuthGuard.ValidateCreatedUser(userResult, nameof(userResult));

            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);

            var encodedToken = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

            var emailResult = await _emailService.SendEmailConfirmationAsync(user, encodedToken);

            EmailGuard.ValidateEmailResult(emailResult, nameof(_emailService.SendEmailConfirmationAsync));

            var tokenResponse = await _tokenService.GetTokensAsync(user, vm.ClientId, false);

            AuthGuard.ValidateTokenResponse(tokenResponse, nameof(tokenResponse));

            return Ok(new
            {
                access_token = tokenResponse?.AccessToken,
                expires_in = tokenResponse?.Expiration,
                token_type = tokenResponse?.TokenType,
                refresh_token = tokenResponse?.RefreshToken
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginVM vm)
        {
            AuthGuard.ValidateGrantType(vm.GrantType, nameof(vm.GrantType), 200);   // always respond with a 200 to throw off bots

            AuthGuard.ValidateScope(vm.Scope, nameof(vm.Scope), 200);

            var user = await _userManager.FindByEmailAsync(vm.Email.ToLower());

            AuthGuard.ValidateUser(user, nameof(user), 200);

            var result = await _signInManager.CheckPasswordSignInAsync(user, vm.Password, true);

            AuthGuard.ValidateSignIn(result, nameof(result), 200);

            var tokenResponse = await _tokenService.GetTokensAsync(user, vm.ClientId, vm.RememberMe);

            AuthGuard.ValidateTokenResponse(tokenResponse, nameof(tokenResponse), 200);

            return Ok(new
            {
                access_token = tokenResponse?.AccessToken,
                expires_in = tokenResponse?.Expiration,
                token_type = tokenResponse?.TokenType,
                refresh_token = tokenResponse?.RefreshToken
            });
        }

        [HttpPost("renew")]
        public async Task<IActionResult> RenewTokens([FromBody] RenewTokenVM vm)
        {
            AuthGuard.ValidateGrantType(vm.GrantType, nameof(vm.GrantType));

            AuthGuard.ValidateScope(vm.Scope, nameof(vm.Scope));

            var refreshToken = AuthGuard.ValidateRefreshToken(vm.RefreshToken, nameof(vm.RefreshToken));

            var tokenResponse = await _tokenService.RenewTokensAsync(refreshToken, vm.ClientId);

            AuthGuard.ValidateTokenResponse(tokenResponse, nameof(tokenResponse));

            return Ok(new
            {
                access_token = tokenResponse?.AccessToken,
                expires_in = tokenResponse?.Expiration,
                token_type = tokenResponse?.TokenType,
                refresh_token = tokenResponse?.RefreshToken
            });
        }

        [HttpPost("revoke")]
        public async Task<IActionResult> RevokeToken([FromBody] RevokeTokenVM vm)
        {
            var refreshToken = AuthGuard.ValidateRefreshToken(vm.RefreshToken, nameof(vm.RefreshToken), 200);

            await _tokenService.RevokeTokenAsync(refreshToken);

            return Ok();
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] PasswordResetVM vm)
        {
            var user = await _userManager.FindByEmailAsync(vm.Email);

            AuthGuard.ValidateUser(user, nameof(user));

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            var encodedToken = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

            var result = await _emailService.SendPasswordResetAsync(user, encodedToken);

            EmailGuard.ValidateEmailResult(result, nameof(_emailService.SendPasswordResetAsync));

            return Ok();
        }
    }
}
