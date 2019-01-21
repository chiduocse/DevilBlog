using DevilBlog.Dto.ManageDTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DevilBlog.Adapter.Interfaces
{
    public interface IUserAdapter
    {
        IEnumerable<UserDto> GetAll();
        Task CreateUserAsync(UserEditDto user);
    }
}