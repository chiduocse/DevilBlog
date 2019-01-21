using AspNet.Security.OpenIdConnect.Primitives;
using DevilBlog.Data.Core.Interfaces;
using DevilBlog.Models.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DevilBlog.Data.Core
{
    public class AccountManager : IAccountManager
    {
        private readonly DevilBlogDbContext _context;
        private readonly UserManager<AspNetUser> _userManager;
        private readonly RoleManager<AspNetRole> _roleManager;

        public AccountManager(
            DevilBlogDbContext context,
            UserManager<AspNetUser> userManager,
            RoleManager<AspNetRole> roleManager,
            IHttpContextAccessor httpContextAccessor
        )
        {
            _context = context;
            _context.CurrentUserId = httpContextAccessor.HttpContext?.User
                .FindFirst(OpenIdConnectConstants.Claims.Subject)?.Value?.Trim();
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<bool> CheckPasswordAsync(AspNetUser user, string password)
        {
            if (!await _userManager.CheckPasswordAsync(user, password))
            {
                if (!_userManager.SupportsUserLockout)
                    await _userManager.AccessFailedAsync(user);
                return false;
            }

            return true;
        }

        public async Task<Tuple<bool, string[]>> CreateRoleAsync(AspNetRole role, IEnumerable<string> claims)
        {
            if (claims == null)
                claims = new string[] { };

            string[] invalidClaims =
                claims.Where(c => ApplicationPermissions.GetPermissionByValue(c) == null).ToArray();
            if (invalidClaims.Any())
                return Tuple.Create(false, new[] { "The following claim types are invalid: " + string.Join(", ", invalidClaims) });

            IdentityResult result = await _roleManager.CreateAsync(role);
            if (!result.Succeeded)
                return Tuple.Create(false, result.Errors.Select(e => e.Description).ToArray());

            role = await _roleManager.FindByNameAsync(role.Name);

            foreach (string claim in claims.Distinct())
            {
                result = await this._roleManager.AddClaimAsync(role,
                    new Claim(CustomClaimTypes.Permission, ApplicationPermissions.GetPermissionByValue(claim)));
                if (!result.Succeeded)
                {
                    await DeleteRoleAsync(role);
                    return Tuple.Create(false, result.Errors.Select(e => e.Description).ToArray());
                }
            }
            return Tuple.Create(true, new string[] { });
        }

        public async Task<Tuple<bool, string[]>> CreateUserAsync(AspNetUser user, IEnumerable<string> roles, string password)
        {
            IdentityResult result = await _userManager.CreateAsync(user, password);
            if (!result.Succeeded)
                return Tuple.Create(false, result.Errors.Select(e => e.Description).ToArray());

            user = await _userManager.FindByNameAsync(user.UserName);
            try
            {
                result = await this._userManager.AddToRolesAsync(user, roles.Distinct());
            }
            catch
            {
                await DeleteUserAsync(user);
                throw;
            }

            if (!result.Succeeded)
            {
                await DeleteUserAsync(user);
                return Tuple.Create(false, result.Errors.Select(e => e.Description).ToArray());
            }

            return Tuple.Create(true, new string[] { });
        }

        public async Task<Tuple<bool, string[]>> DeleteRoleAsync(AspNetRole role)
        {
            IdentityResult result = await _roleManager.DeleteAsync(role);
            return Tuple.Create(result.Succeeded, result.Errors.Select(e => e.Description).ToArray());
        }

        public async Task<Tuple<bool, string[]>> DeleteUserAsync(string userId)
        {
            AspNetUser user = await _userManager.FindByIdAsync(userId);
            if (user != null)
                return await DeleteUserAsync(user);
            return Tuple.Create(true, new string[] { });
        }

        public async Task<Tuple<bool, string[]>> DeleteUserAsync(AspNetUser user)
        {
            IdentityResult result = await _userManager.DeleteAsync(user);
            return Tuple.Create(result.Succeeded, result.Errors.Select(e => e.Description).ToArray());
        }

        public async Task<AspNetRole> GetRoleByNameAsync(string roleName)
        {
            return await _roleManager.FindByNameAsync(roleName);
        }
    }
}