using DevilBlog.Business.Interfaces;
using DevilBlog.Data.Infrastructure;
using DevilBlog.Models.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DevilBlog.Business
{
    public class TopicBusiness : ITopicBusiness
    {
        private readonly IUnitOfWork _uow;
        public TopicBusiness(IUnitOfWork uow)
        {
            _uow = uow;
        }
        public void Add(Topic topic)
        {
            _uow.Topics.Add(topic);
            _uow.SaveChanges();
        }

        public void Delete(int id)
        {
            _uow.Topics.Remove(id);
            _uow.SaveChanges();
        }

        public IEnumerable<Topic> GetAll()
        {
            return _uow.Topics.GetAll();
        }

        public Topic GetById(int id)
        {
            return _uow.Topics.GetSingleById(id);
        }

        public void SaveChanges()
        {
            _uow.SaveChanges();
        }

        public void Update(Topic topic)
        {
            _uow.Topics.Update(topic);
            _uow.SaveChanges();
        }
    }
}
