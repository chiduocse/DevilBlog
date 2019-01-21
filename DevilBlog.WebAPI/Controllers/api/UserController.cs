using DevilBlog.Adapter.Interfaces;
using DevilBlog.Dto.ManageDTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace DevilBlog.WebAPI.Controllers.api
{
    //[Authorize]
    public class UserController : BaseController
    {
        private readonly ILogger _logger;
        private IUserAdapter _userAdapter;

        public UserController(
            ILoggerFactory loggerFactory,
            IUserAdapter userAdapter
        )
        {
            _logger = loggerFactory.CreateLogger<UserController>();
            _userAdapter = userAdapter;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var data = _userAdapter.GetAll();
            return Ok(data);
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] UserEditDto user)
        {
            if (ModelState.IsValid)
            {
                if (user == null)
                    return BadRequest($"{nameof(user)} cannot be null");

                await _userAdapter.CreateUserAsync(user);
            }
            return BadRequest(ModelState);
        }
    }
}