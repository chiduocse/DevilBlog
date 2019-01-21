using System.Threading.Tasks;
using DevilBlog.Dto.AccountDTOs;
using Microsoft.AspNetCore.Identity;

namespace DevilBlog.Adapter.Interfaces
{
    public interface IAccountAdapter
    {
        Task<IdentityResult> Register(RegisterDto registerDto);
        Task<IdentityResult> AddToRoleAsync(RegisterDto registerDto, string role);
    }
}
