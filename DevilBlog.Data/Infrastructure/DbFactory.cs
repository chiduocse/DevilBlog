using System;
using System.Collections.Generic;
using System.Text;
using DevilBlog.Data.Core.Services;
using Microsoft.EntityFrameworkCore;

namespace DevilBlog.Data.Infrastructure
{
    public class DbFactory : Disposable, IDbFactory
    {
        private DevilBlogDbContext _dbContext;
        private readonly DbContextOptions<DevilBlogDbContext> _options;
        private readonly UserResolverService _userResolver;

        public DbFactory(DbContextOptions<DevilBlogDbContext> options, UserResolverService userResolver)
        {
            _options = options;
            _userResolver = userResolver;
        }

        public DevilBlogDbContext Init()
        {
            return _dbContext ?? (_dbContext = new DevilBlogDbContext(_options, _userResolver));
        }
        protected override void DisposeCore()
        {
            _dbContext?.Dispose();
        }
    }
}
