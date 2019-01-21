using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DevilBlog.Business.Interfaces;
using DevilBlog.Data.IdentityConfig;
using DevilBlog.Models.Models;
using Microsoft.AspNetCore.Identity;

namespace DevilBlog.Business
{
    public class AccountBusiness : IAccountBusiness
    {
        private readonly AspNetUserManager _userManager;

        public AccountBusiness(AspNetUserManager userManager)
        {
            _userManager = userManager;
        }

        public async Task<AspNetUser> FindByIdAsync(string userId)
        {
            return await _userManager.FindByIdAsync(userId);
        }
        public async Task<AspNetUser> FindByNameAsync(string userName)
        {
            return await _userManager.FindByNameAsync(userName);
        }

        public async Task<IdentityResult> Register(AspNetUser user, string password)
        {
            IdentityResult result = await _userManager.CreateAsync(user, password);

            if (result.Succeeded)
            {
                // Add to roles
                IdentityResult roleAddResult = await _userManager.AddToRoleAsync(user, "user");
                if (roleAddResult.Succeeded)
                {
                    string code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                }

                return roleAddResult;
            }
            return result;

        }

        public async Task<IdentityResult> ConfirmEmailAsync(AspNetUser user, string token)
        {
            return await _userManager.ConfirmEmailAsync(user, token);
        }

        public async Task<IdentityResult> AddToRoleAsync(AspNetUser user, string role)
        {
            return await _userManager.AddToRoleAsync(user, role);
        }
    }
}
