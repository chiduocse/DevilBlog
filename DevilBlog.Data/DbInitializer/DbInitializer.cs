using DevilBlog.Data.Core;
using DevilBlog.Data.Core.Interfaces;
using DevilBlog.Models.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using OpenIddict.Core;
using OpenIddict.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using AspNet.Security.OpenIdConnect.Primitives;
using Microsoft.AspNetCore.Identity;

namespace DevilBlog.Data.DbInitializer
{
    public interface IDbInitializer
    {
        Task SeedAsync(IConfiguration configuration);
    }
    public class DbInitializer : IDbInitializer
    {
        private readonly DevilBlogDbContext _context;
        private readonly UserManager<AspNetUser> _userManager;
        private readonly RoleManager<AspNetRole> _roleManager;
        private readonly IAccountManager _accountManager;
        private readonly ILogger _logger;
        private readonly OpenIddictApplicationManager<OpenIddictApplication> _openIddictApplicationManager;

        public DbInitializer(
            DevilBlogDbContext context,
            ILogger<DbInitializer> logger,
            OpenIddictApplicationManager<OpenIddictApplication> openIddictApplicationManager,
            UserManager<AspNetUser> userManager,
            RoleManager<AspNetRole> roleManager
            )
        {
            _context = context;
            _logger = logger;
            _openIddictApplicationManager = openIddictApplicationManager;
            _roleManager = roleManager;
            _userManager = userManager;
        }

        public async Task SeedAsync(IConfiguration configuration)
        {
            await _context.Database.MigrateAsync().ConfigureAwait(false);
            CreateRoles();
            CreateUsers();
            AddLocalisedData();
            await AddOpenIdConnectOptions(configuration);
        }

        private void CreateRoles()
        {
            var rolesToAdd = new List<AspNetRole>()
            {
                new AspNetRole {Name = "Administrator", Description = "Full rights role"},
                new AspNetRole {Name = "User", Description = "Limited rights role"}
            };
            foreach (var role in rolesToAdd)
            {
                if (!_roleManager.RoleExistsAsync(role.Name).Result)
                {
                    _roleManager.CreateAsync(role).Result.ToString();
                }
            }
        }

        private void CreateUsers()
        {
            AspNetUser aspNetAdmin = new AspNetUser
            {
                UserName = "chiduocse",
                FirstName = "Nguyễn Chí",
                LastName = "Được",
                Address = "Hà Nội",
                BirthDay = DateTime.ParseExact("09/04/1994", "dd/MM/yyyy", CultureInfo.CurrentCulture),
                Email = "chiduocse@gmail.com",
                EmailConfirmed = true,
                IsEnabled = true,
                PhoneNumber = "+84969177225",
                Gender = true,
                PhoneNumberConfirmed = true,
                CreatedDate = DateTime.Now,
                SecurityStamp = Guid.NewGuid().ToString("D")
            };

            AspNetUser aspNetUser = new AspNetUser
            {
                UserName = "user",
                FirstName = "user",
                LastName = "test",
                Address = "Hà Nội",
                BirthDay = DateTime.ParseExact("25/10/1995", "dd/MM/yyyy", CultureInfo.CurrentCulture),
                Email = "duocn94@gmail.com",
                EmailConfirmed = true,
                IsEnabled = true,
                PhoneNumber = "+84986280144",
                Gender = true,
                CreatedDate = DateTime.Now,
                SecurityStamp = Guid.NewGuid().ToString("D")
            };
            _userManager.CreateAsync(aspNetAdmin, "Admin@123").Result.ToString();
            _userManager.AddClaimAsync(aspNetAdmin, new Claim(OpenIdConnectConstants.Claims.PhoneNumber, aspNetAdmin.PhoneNumber.ToString(), ClaimValueTypes.Integer)).Result.ToString();
            _userManager.AddToRoleAsync(_userManager.FindByNameAsync("chiduocse").GetAwaiter().GetResult(), "Administrator").Result.ToString();

            _userManager.CreateAsync(aspNetUser, "Admin@123").Result.ToString();
            _userManager.AddClaimAsync(aspNetUser, new Claim(OpenIdConnectConstants.Claims.PhoneNumber, aspNetAdmin.PhoneNumber.ToString(), ClaimValueTypes.Integer)).Result.ToString();
            _userManager.AddToRoleAsync(_userManager.FindByNameAsync("user").GetAwaiter().GetResult(), "User").Result.ToString();
        }

        private void AddLocalisedData()
        {
            if (!_context.Countries.Any())
            {
                _context.Countries.AddRange(
                   new Country
                   {
                       CountryName = "Việt Nam",
                       CountryCode = "84",
                       IsoAlpha2Code = "VN",
                       IsoAlpha3Code = "VNM",
                       Culture = "vi-VN",
                       Flag = "images/countries/vn.png",
                       Resources = new List<Resource>()
                       {
                            new Resource {Key = "app_title", Value = "DevilBlog"},
                            new Resource {Key = "app_description", Value = "Blog về công nghệ thông tin"},
                            new Resource {Key = "app_nav_home", Value = "Trang chủ"},
                            new Resource {Key = "app_nav_chat", Value = "Chat"},
                            new Resource {Key = "app_nav_examples", Value = "Ví dụ"},
                            new Resource {Key = "app_nav_register", Value = "Đăng ký"},
                            new Resource {Key = "app_nav_login", Value = "Đăng nhập"},
                            new Resource {Key = "app_nav_logout", Value = "Đăng xuất"},
                       }
                   },
                   new Country
                   {
                       CountryName = "United Kingdom",
                       CountryCode = "44",
                       IsoAlpha2Code = "GB",
                       IsoAlpha3Code = "GBR",
                       Culture = "cy-GB",
                       Flag = "images/countries/gb.png",
                       Resources = new List<Resource>()
                       {
                            new Resource { Key = "app_title", Value = "DevilBlog" },
                            new Resource { Key = "app_description", Value = "Blog about information technology" },
                            new Resource { Key = "app_nav_home", Value = "Home" },
                            new Resource { Key = "app_nav_chat", Value = "Chat" },
                            new Resource { Key = "app_nav_examples", Value = "Examples" },
                            new Resource { Key = "app_nav_register", Value = "Register" },
                            new Resource { Key = "app_nav_login", Value = "Login" },
                            new Resource { Key = "app_nav_logout", Value = "Logout" },
                       }
                   },
                   new Country
                   {
                       CountryName = "United States of America",
                       CountryCode = "1",
                       IsoAlpha2Code = "US",
                       IsoAlpha3Code = "USA",
                       Culture = "en-US",
                       Flag = "images/countries/us.png",
                       Resources = new List<Resource>()
                       {
                            new Resource { Key = "app_title", Value = "DevilBlog" },
                            new Resource { Key = "app_description", Value = "Blog about information technology" },
                            new Resource { Key = "app_nav_home", Value = "Home" },
                            new Resource { Key = "app_nav_chat", Value = "Chat" },
                            new Resource { Key = "app_nav_examples", Value = "Examples" },
                            new Resource { Key = "app_nav_register", Value = "Register" },
                            new Resource { Key = "app_nav_login", Value = "Login" },
                            new Resource { Key = "app_nav_logout", Value = "Logout" },
                       }
                   });
                _context.SaveChanges();
            }
        }

        private async Task AddOpenIdConnectOptions(IConfiguration configuration)
        {

            if (await _openIddictApplicationManager.FindByClientIdAsync("devilblog") == null)
            {
                var host = configuration["HostUrl"].ToString();

                var descriptor = new OpenIddictApplicationDescriptor
                {
                    ClientId = "devilblog",
                    DisplayName = "DevilBlog",
                    PostLogoutRedirectUris = { new Uri($"{host}signout-oidc") },
                    RedirectUris = { new Uri(host) },
                    Permissions =
                    {
                        OpenIddictConstants.Permissions.Endpoints.Authorization,
                        OpenIddictConstants.Permissions.Endpoints.Token,
                        OpenIddictConstants.Permissions.GrantTypes.Implicit,
                        OpenIddictConstants.Permissions.GrantTypes.Password,
                        OpenIddictConstants.Permissions.GrantTypes.RefreshToken
                    }
                };

                await _openIddictApplicationManager.CreateAsync(descriptor);
            }
        }
    }
}