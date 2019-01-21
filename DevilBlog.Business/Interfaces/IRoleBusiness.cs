using System.Collections.Generic;
using DevilBlog.Models.Models;
using System.Linq;
using System.Threading.Tasks;

namespace DevilBlog.Business.Interfaces
{
    public interface IRoleBusiness
    {
        List<AspNetRole> GetAll();
    }
}