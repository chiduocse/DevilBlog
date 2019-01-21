using AutoMapper;
using DevilBlog.Dto;
using DevilBlog.Dto.AccountDTOs;
using DevilBlog.Dto.ManageDTOs;
using DevilBlog.Models.Models;

namespace DevilBlog.Adapter
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<AspNetUser, UserDto>().ReverseMap();
            CreateMap<AspNetUser, UserEditDto>().ReverseMap();
            CreateMap<AspNetUser, RegisterDto>().ReverseMap();
            CreateMap<AspNetRole, RoleDto>().ReverseMap();
            CreateMap<TopicDto, Topic>().ReverseMap();
        }
    }
}