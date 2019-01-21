using DevilBlog.Models.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DevilBlog.Business.Interfaces
{
    public interface ITopicBusiness
    {
        void Add(Topic topic);
        void Update(Topic topic);
        void Delete(int id);
        Topic GetById(int id);
        IEnumerable<Topic> GetAll();
        void SaveChanges();
    }
}
