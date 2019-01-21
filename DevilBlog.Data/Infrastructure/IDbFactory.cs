using System;

namespace DevilBlog.Data.Infrastructure
{
    public interface IDbFactory : IDisposable
    {
        DevilBlogDbContext Init();
    }
}