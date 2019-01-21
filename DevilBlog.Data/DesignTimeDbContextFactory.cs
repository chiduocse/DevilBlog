//using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.Design;
//using Microsoft.Extensions.Configuration;
//using Microsoft.Extensions.DependencyInjection;
//using System.IO;
//using System.Reflection;

//namespace DevilBlog.Data
//{
//    internal class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<DevilBlogDbContext>
//    {
//        public DevilBlogDbContext CreateDbContext(string[] args)
//        {
//            IConfigurationRoot configuration = new ConfigurationBuilder()
//                .SetBasePath(Directory.GetCurrentDirectory())
//                .AddJsonFile("appsettings.json", true, true)
//                .AddJsonFile("appsettings.Development.json", optional: true)
//                .Build();

//            string connectionString = configuration["Data:SqlServerConnectionString"];

//            DbContextOptionsBuilder<DevilBlogDbContext> builder = new DbContextOptionsBuilder<DevilBlogDbContext>();

//            builder.UseSqlServer(connectionString, optionsBuilder => optionsBuilder.MigrationsAssembly(typeof(DevilBlogDbContext).GetTypeInfo().Assembly.GetName().Name));
//            builder.UseOpenIddict();
//            return new DevilBlogDbContext(builder.Options);
//        }
//    }
//}