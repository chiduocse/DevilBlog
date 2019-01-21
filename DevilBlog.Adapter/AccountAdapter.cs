using DevilBlog.Adapter.Interfaces;
using DevilBlog.Dto.AccountDTOs;
using System;
using System.Threading.Tasks;
using AutoMapper;
using DevilBlog.Business.Interfaces;
using DevilBlog.Models.Models;
using Microsoft.AspNetCore.Identity;

namespace DevilBlog.Adapter
{
    public class AccountAdapter : IAccountAdapter
    {
        private readonly IAccountBusiness _accountBusiness;
        private readonly IMapper _mapper;

        public AccountAdapter(IAccountBusiness accountBusiness, IMapper mapper)
        {
            _accountBusiness = accountBusiness;
            _mapper = mapper;
        }

        public async Task<IdentityResult> Register(RegisterDto registerDto)
        {
            AspNetUser user = _mapper.Map<RegisterDto, AspNetUser>(registerDto);
            return await _accountBusiness.Register(user, registerDto.Password);
        }

        public async Task<IdentityResult> AddToRoleAsync(RegisterDto registerDto, string role)
        {
            AspNetUser user = _mapper.Map<RegisterDto, AspNetUser>(registerDto);
            return await _accountBusiness.AddToRoleAsync(user, role);
        }
    }
}