using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace DevilBlog.Data.Core.Services
{
    public interface IApplicationDataService
    {
        Task<object> GetApplicationData(HttpContext context);
    }
}