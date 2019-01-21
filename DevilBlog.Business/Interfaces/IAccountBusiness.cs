using DevilBlog.Models.Models;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace DevilBlog.Business.Interfaces
{
    public interface IAccountBusiness
    {
        Task<IdentityResult> Register(AspNetUser user, string password);

        Task<AspNetUser> FindByIdAsync(string userId);

        Task<AspNetUser> FindByNameAsync(string userName);

        Task<IdentityResult> ConfirmEmailAsync(AspNetUser user, string token);

        Task<IdentityResult> AddToRoleAsync(AspNetUser user, string role);
    }
}