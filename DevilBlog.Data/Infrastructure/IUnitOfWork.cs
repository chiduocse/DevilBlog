using DevilBlog.Data.Repositories.Interfaces;
using System.Threading.Tasks;

namespace DevilBlog.Data.Infrastructure
{
    public interface IUnitOfWork
    {

        ITopicRepository Topics { get; }
        void SaveChanges();

        Task SaveChangesAsync();

        void Dispose();
    }
}