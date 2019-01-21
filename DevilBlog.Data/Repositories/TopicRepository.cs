using DevilBlog.Data.Infrastructure;
using DevilBlog.Data.Repositories.Interfaces;
using DevilBlog.Models.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DevilBlog.Data.Repositories
{
    public class TopicRepository : RepositoryBase<Topic>, ITopicRepository
    {
        public TopicRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
