using DevilBlog.Adapter.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace DevilBlog.WebAPI.Controllers.api
{
    public class RoleController : BaseController
    {
        private readonly ILogger _logger;
        private readonly IRoleAdapter _roleAdapter;

        public RoleController(ILoggerFactory loggerFactory, IRoleAdapter roleAdapter)
        {
            _logger = loggerFactory.CreateLogger<RoleController>();
            _roleAdapter = roleAdapter;
        }

        [HttpGet]
        public IActionResult GetRoles()
        {
            var data = _roleAdapter.GetAll();
            return Ok(data);
        }
    }
}