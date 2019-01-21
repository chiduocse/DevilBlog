using DevilBlog.Data.Repositories;
using DevilBlog.Data.Repositories.Interfaces;
using System.Threading.Tasks;

namespace DevilBlog.Data.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IDbFactory _dbFactory;
        private DevilBlogDbContext _dbContext;

        ITopicRepository _topics;

        public UnitOfWork(IDbFactory dbFactory)
        {
            this._dbFactory = dbFactory;
        }

        public DevilBlogDbContext DbContext
        {
            get { return _dbContext ?? (_dbContext = _dbFactory.Init()); }
        }


        public ITopicRepository Topics
        {
            get
            {
                if (_topics == null)
                    _topics = new TopicRepository(_dbFactory);
                return _topics;
            }
        }

        public void SaveChanges()
        {
            DbContext.SaveChanges();
        }

        public async Task SaveChangesAsync()
        {
            await DbContext.SaveChangesAsync();
        }

        public void Dispose()
        {
            DbContext?.Dispose();
        }
    }
}