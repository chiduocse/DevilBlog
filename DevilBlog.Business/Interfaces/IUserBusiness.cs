using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DevilBlog.Models.Models;

namespace DevilBlog.Business.Interfaces
{
    public interface IUserBusiness
    {
        IQueryable<AspNetUser> GetAll();

        Task CreateUserAsync(AspNetUser user, IEnumerable<string> roles, string password);

        Task DeleteUserAsync(AspNetUser user);
    }
}