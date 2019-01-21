using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace DevilBlog.Data.Infrastructure
{
    public interface IRepository<T> where T : class
    {
        // Marks an entity as new
        void Add(T entity);

        void AddRange(IEnumerable<T> entities);

        // Marks an entity as modified
        void Update(T entity);

        void UpdateRange(IEnumerable<T> entities);

        // Marks an entity to be removed
        void Remove(T entity);

        void Remove(int id);

        //Delete multi records
        void RemoveRange(Expression<Func<T, bool>> where);

        // Get an entity by int id
        T GetSingleById(int id);

        T GetSingleByCondition(Expression<Func<T, bool>> expression, string[] includes = null);

        IEnumerable<T> GetAll(string[] includes = null);

        IEnumerable<T> GetMulti(Expression<Func<T, bool>> predicate, string[] includes = null);

        IEnumerable<T> GetMultiPaging(Expression<Func<T, bool>> filter, out int total, int index = 0, int size = 50, string[] includes = null);

        int Count(Expression<Func<T, bool>> where);

        bool CheckContains(Expression<Func<T, bool>> predicate);
    }
}
