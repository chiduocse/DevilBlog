using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DevilBlog.Models.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using DevilBlog.Dto.ManageDTOs;

namespace DevilBlog.WebAPI.Controllers.api
{
    public class ManageController : BaseController
    {
        private readonly UserManager<AspNetUser> _userManager;
        private readonly ILogger _logger;

        public ManageController(UserManager<AspNetUser> userManager, ILogger logger)
        {
            _userManager = userManager;
            _logger = logger;
        }

        [HttpGet("userinfo")]
        public async Task<IActionResult> UserInfo()
        {
            var user = await GetCurrentUserAsync();
            return Ok(new IndexDto
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Username = user.UserName,
                IsEmailConfirmed = user.EmailConfirmed,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber
            });
        }
        #region Helpers
        private Task<AspNetUser> GetCurrentUserAsync()
        {
            return _userManager.GetUserAsync(HttpContext.User);
        }
        #endregion
    }
}