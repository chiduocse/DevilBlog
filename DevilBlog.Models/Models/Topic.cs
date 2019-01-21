using DevilBlog.Models.Abstract;
using System.Collections.Generic;

namespace DevilBlog.Models.Models
{
    public class Topic : AuditableEntity
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool ShowOnHomePage { get; set; }
        public ICollection<PostTopic> PostTopics { get; set; }
    }
}