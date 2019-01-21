using DevilBlog.Models.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DevilBlog.Data.Core.Interfaces
{
    public interface IAccountManager
    {
        Task<bool> CheckPasswordAsync(AspNetUser user, string password);

        Task<Tuple<bool, string[]>> CreateRoleAsync(AspNetRole role, IEnumerable<string> claims);
        Task<Tuple<bool, string[]>> CreateUserAsync(AspNetUser user, IEnumerable<string> roles, string password);
        Task<AspNetRole> GetRoleByNameAsync(string roleName);
    }
}