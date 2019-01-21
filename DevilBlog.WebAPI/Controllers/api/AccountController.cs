using DevilBlog.Adapter.Interfaces;
using DevilBlog.Dto.AccountDTOs;
using DevilBlog.WebAPI.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace DevilBlog.WebAPI.Controllers.api
{
    [Authorize]
    public class AccountController : BaseController
    {
        private readonly ILogger _logger;
        private IAccountAdapter _accountAdapter;

        public AccountController(
            IAccountAdapter accountAdapter,
            ILoggerFactory loggerFactory)
        {
            _accountAdapter = accountAdapter;
            _logger = loggerFactory.CreateLogger<AccountController>();
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterDto model, string returnUrl = null)
        {
            var result = await _accountAdapter.Register(model);
            if (result.Succeeded)
            {
                // Add to roles
                //var roleAddResult = await _userManager.AddToRoleAsync(currentUser, "user");
                //if (roleAddResult.Succeeded)
                //{
                //    var code = await _userManager.GenerateEmailConfirmationTokenAsync(currentUser);

                //    var host = Request.Scheme + "://" + Request.Host;
                //    var callbackUrl = host + "?userId=" + currentUser.Id + "&emailConfirmCode=" + code;
                //    var confirmationLink = "<a class='btn-primary' href=\"" + callbackUrl + "\">Confirm email address</a>";
                //    _logger.LogInformation(3, "User created a new account with password.");
                //    //await _emailSender.SendEmailAsync(model.Email, "Registration confirmation email", confirmationLink);
                //    return NoContent();
                //}
                return NoContent();
            }

            AddErrors(result);
            // If we got this far, something failed, redisplay form
            return BadRequest(new ApiError(ModelState));
        }

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }
    }
}