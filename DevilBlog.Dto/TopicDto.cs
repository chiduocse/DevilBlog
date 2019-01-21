using System;
using System.Collections.Generic;
using System.Text;

namespace DevilBlog.Dto
{
    public class TopicDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool ShowOnHomePage { get; set; }
        public bool Status { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
