using DevilBlog.Dto.ManageDTOs;
using System.Collections.Generic;

namespace DevilBlog.Adapter.Interfaces
{
    public interface IRoleAdapter
    {
        List<RoleDto> GetAll();
    }
}