using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;

namespace DevilBlog.Data.EFLocalizer
{
    public class EFStringLocalizer : IStringLocalizer
    {
        private readonly DevilBlogDbContext _context;

        public EFStringLocalizer(DevilBlogDbContext context)
        {
            _context = context;
        }

        private string GetString(string name)
        {
            return _context.Resources
                .Include(r => r.Country)
                .Where(r => r.Country.Culture == CultureInfo.CurrentCulture.Name)
                .FirstOrDefault(r => r.Key == name)?.Value;
        }

        public IEnumerable<LocalizedString> GetAllStrings(bool includeParentCultures)
        {
            return _context.Resources
                .Include(r => r.Country)
                .Where(r => r.Country.Culture == CultureInfo.CurrentCulture.Name)
                .Select(r => new LocalizedString(r.Key, r.Value, true));
        }

        public IStringLocalizer WithCulture(CultureInfo culture)
        {
            CultureInfo.DefaultThreadCurrentCulture = culture;
            return new EFStringLocalizer(_context);
        }

        public LocalizedString this[string name]
        {
            get
            {
                var value = GetString(name);
                return new LocalizedString(name, value ?? name, resourceNotFound: value == null);
            }
        }

        public LocalizedString this[string name, params object[] arguments]
        {
            get
            {
                var format = GetString(name);
                var value = string.Format(format ?? name, arguments);
                return new LocalizedString(name, value, resourceNotFound: format == null);
            }
        }
    }
}