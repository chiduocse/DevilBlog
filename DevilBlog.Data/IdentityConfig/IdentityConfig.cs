using DevilBlog.Models.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;

namespace DevilBlog.Data.IdentityConfig
{
    public class AspNetUserManager : UserManager<AspNetUser>
    {
        public AspNetUserManager(IUserStore<AspNetUser> store, IOptions<IdentityOptions> optionsAccessor, IPasswordHasher<AspNetUser> passwordHasher, IEnumerable<IUserValidator<AspNetUser>> userValidators, IEnumerable<IPasswordValidator<AspNetUser>> passwordValidators, ILookupNormalizer keyNormalizer, IdentityErrorDescriber errors, IServiceProvider services, ILogger<UserManager<AspNetUser>> logger) : base(store, optionsAccessor, passwordHasher, userValidators, passwordValidators, keyNormalizer, errors, services, logger)
        {
        }
    }
    public class AspNetRoleManager : RoleManager<AspNetRole>
    {
        public AspNetRoleManager(IRoleStore<AspNetRole> store, IEnumerable<IRoleValidator<AspNetRole>> roleValidators, ILookupNormalizer keyNormalizer, IdentityErrorDescriber errors, ILogger<RoleManager<AspNetRole>> logger) : base(store, roleValidators, keyNormalizer, errors, logger)
        {
        }
    }
}