using System;
using System.Collections.Generic;
using DevilBlog.Business.Interfaces;
using DevilBlog.Data.IdentityConfig;
using DevilBlog.Models.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace DevilBlog.Business
{
    public class UserBusiness : IUserBusiness
    {
        private readonly AspNetUserManager _userManager;

        public UserBusiness(AspNetUserManager userManager)
        {
            _userManager = userManager;
        }

        public IQueryable<AspNetUser> GetAll()
        {
            var data = _userManager.Users;
            return data;
        }

        public async Task CreateUserAsync(AspNetUser user, IEnumerable<string> roles, string password)
        {
            await _userManager.CreateAsync(user, password);
            user = await _userManager.FindByNameAsync(user.UserName);
            try
            {
                await this._userManager.AddToRolesAsync(user, roles.Distinct());
            }
            catch
            {
                await DeleteUserAsync(user);
                throw;
            }   
        }

        public async Task DeleteUserAsync(AspNetUser user)
        {
            await _userManager.DeleteAsync(user);
        }
    }
}