using DevilBlog.Models.Models;
using DevilBlog.WebAPI.Controllers.api;
//using DevilBlog.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DevilBlog.WebAPI.Controllers
{
    public class HomeController : BaseController 

    {
        //private readonly IApplicationDataService _applicationDataService;
        private readonly UserManager<AspNetUser> _userManager;

        public HomeController(UserManager<AspNetUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {

            return Ok();
        }
    }
}