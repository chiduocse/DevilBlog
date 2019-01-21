using AutoMapper;
using DevilBlog.Adapter.Interfaces;
using DevilBlog.Business.Interfaces;
using DevilBlog.Dto;
using DevilBlog.Models.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DevilBlog.Adapter
{
    public class TopicAdapter : ITopicAdapter
    {
        private readonly ITopicBusiness _topicBusiness;
        private readonly IMapper _mapper;

        public TopicAdapter(ITopicBusiness topiBusiness, IMapper mapper)
        {
            _topicBusiness = topiBusiness;
            _mapper = mapper;
        }

        public IEnumerable<TopicDto> GetAll()
        {
            IEnumerable<Topic> topics = _topicBusiness.GetAll();
            IEnumerable<TopicDto> topicDtos = _mapper.Map<IEnumerable<Topic>, IEnumerable<TopicDto>>(topics);
            return topicDtos;
        }

        public void Add(TopicDto topicDto)
        {
            Topic topic = _mapper.Map<TopicDto, Topic>(topicDto);
            _topicBusiness.Add(topic);
        }

        public void Update(int id, TopicDto topicDto)
        {
            Topic topicOld = _topicBusiness.GetById(id);
            topicOld = _mapper.Map(topicDto, topicOld);
            _topicBusiness.Update(topicOld);
        }

        public void Delete(int id)
        {
            _topicBusiness.Delete(id);
        }
    }
}
