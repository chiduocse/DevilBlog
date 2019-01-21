using DevilBlog.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace DevilBlog.Adapter.Interfaces
{
    public interface ITopicAdapter
    {
        IEnumerable<TopicDto> GetAll();
        void Add(TopicDto topicDto);
        void Update(int id, TopicDto topicDto);
        void Delete(int id);
    }
}
