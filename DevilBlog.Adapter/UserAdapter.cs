using System.Collections.Generic;
using AutoMapper;
using DevilBlog.Adapter.Interfaces;
using DevilBlog.Business.Interfaces;
using DevilBlog.Dto;
using DevilBlog.Models.Models;
using System.Linq;
using System.Threading.Tasks;
using DevilBlog.Dto.ManageDTOs;

namespace DevilBlog.Adapter
{
    public class UserAdapter : IUserAdapter
    {
        private readonly IUserBusiness _userBusiness;
        private readonly IMapper _mapper;

        public UserAdapter(IUserBusiness userBusiness, IMapper mapper)
        {
            _userBusiness = userBusiness;
            _mapper = mapper;
        }

        public IEnumerable<UserDto> GetAll()
        {
            var users = _userBusiness.GetAll();
            var userData = _mapper.Map<IEnumerable<AspNetUser>, IEnumerable<UserDto>>(users);
            return userData;
        }

        public async Task CreateUserAsync(UserEditDto user)
        {
            AspNetUser entity = _mapper.Map<UserEditDto, AspNetUser>(user);
            string[] roles = user.Roles;
            await _userBusiness.CreateUserAsync(entity, roles, user.NewPassword);
        }
    }
}