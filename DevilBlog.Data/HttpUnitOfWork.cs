using AspNet.Security.OpenIdConnect.Primitives;
using DevilBlog.Data.Infrastructure;
using Microsoft.AspNetCore.Http;

namespace DevilBlog.Data
{
    public class HttpUnitOfWork : UnitOfWork
    {
        public HttpUnitOfWork(IDbFactory dbFactory, IHttpContextAccessor httpAccessor) : base(dbFactory)
        {
            dbFactory.Init().CurrentUserId = httpAccessor.HttpContext.User
                .FindFirst(OpenIdConnectConstants.Claims.Subject)?.Value.Trim();
        }
    }
}