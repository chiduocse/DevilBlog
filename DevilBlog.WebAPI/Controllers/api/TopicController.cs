using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DevilBlog.Adapter.Interfaces;
using DevilBlog.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;


namespace DevilBlog.WebAPI.Controllers.api
{
    public class TopicController : BaseController
    {
        private readonly ILogger _logger;
        private ITopicAdapter _topicAdapter;

        public TopicController(ILoggerFactory loggerFactory, ITopicAdapter topicAdapter)
        {
            _logger = loggerFactory.CreateLogger<TopicController>();
            _topicAdapter = topicAdapter;
        }
        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<TopicDto> Get()
        {
            return _topicAdapter.GetAll();
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        [HttpPost]
        public IActionResult Post([FromBody]TopicDto topic)
        {
            try
            {
                _topicAdapter.Add(topic);
            }
            catch (Exception ex)
            {
                return BadRequest(ModelState);
            }
            return Ok();
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]TopicDto topic)
        {
            try
            {
                _topicAdapter.Update(id, topic);
            }
            catch (Exception ex)
            {
                return BadRequest(ModelState);
            }
            return Ok();
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _topicAdapter.Delete(id);

            }
            catch (Exception ex)
            {

                return BadRequest();

            }
            return Ok();
        }
    }
}
