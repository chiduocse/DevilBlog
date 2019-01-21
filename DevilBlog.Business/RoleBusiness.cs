using DevilBlog.Business.Interfaces;
using DevilBlog.Data.IdentityConfig;
using DevilBlog.Models.Models;
using System.Collections.Generic;
using System.Linq;

namespace DevilBlog.Business
{
    public class RoleBusiness : IRoleBusiness
    {
        private readonly AspNetRoleManager _roleManager;

        public RoleBusiness(AspNetRoleManager roleManager)
        {
            _roleManager = roleManager;
        }

        public List<AspNetRole> GetAll()
        {
            List<AspNetRole> data = _roleManager.Roles.ToList();
            return data;
        }
    }
}