using DevilBlog.Data.Core.Services;
using DevilBlog.Data.DbInitializer;
using DevilBlog.Data.EFLocalizer;
using DevilBlog.Data.Infrastructure;
using DevilBlog.Data.Repositories;
using DevilBlog.Data.Repositories.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.Text;

namespace DevilBlog.Data
{
    public static class ServicesCollectionExtension
    {
        public static IServiceCollection AddInfrastructurServices(this IServiceCollection services)
        {
            services.AddSingleton<IStringLocalizerFactory, EFStringLocalizerFactory>();
            services.AddTransient<IApplicationDataService, ApplicationDataService>();
            services.AddScoped<IUnitOfWork, HttpUnitOfWork>();
            services.AddTransient<DevilBlogDbContext>();
            services.AddTransient<IDbInitializer, DbInitializer.DbInitializer>();
            services.AddTransient<ITopicRepository, TopicRepository>();

            return services;
        }
    }
}
