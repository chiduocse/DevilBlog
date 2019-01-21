using System;
using Microsoft.Extensions.Localization;

namespace DevilBlog.Data.EFLocalizer
{
    public class EFStringLocalizerFactory : IStringLocalizerFactory
    {
        private readonly DevilBlogDbContext _context;

        public EFStringLocalizerFactory(DevilBlogDbContext context)
        {
            _context = context;
        }
        public IStringLocalizer Create(Type resourceSource)
        {
            return new EFStringLocalizer(_context);
        }

        public IStringLocalizer Create(string baseName, string location)
        {
            return new EFStringLocalizer(_context);
        }
    }
}