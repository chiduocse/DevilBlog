using AutoMapper;
using DevilBlog.Adapter.Interfaces;
using DevilBlog.Business.Interfaces;
using DevilBlog.Dto.ManageDTOs;
using DevilBlog.Models.Models;
using System.Collections.Generic;

namespace DevilBlog.Adapter
{
    public class RoleAdapter : IRoleAdapter
    {
        private readonly IRoleBusiness _roleBusiness;

        public RoleAdapter(IRoleBusiness roleBusiness, IMapper mapper)
        {
            _roleBusiness = roleBusiness;
            _mapper = mapper;
        }

        private readonly IMapper _mapper;

        public List<RoleDto> GetAll()
        {
            List<AspNetRole> roles = _roleBusiness.GetAll();
            List<RoleDto> rolesData = _mapper.Map<List<AspNetRole>, List<RoleDto>>(roles);
            return rolesData;
        }
    }
}