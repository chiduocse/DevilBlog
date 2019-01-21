using System.Collections.Generic;

namespace DevilBlog.Models.Models
{
    public class Tag
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public ICollection<PostTag> PostTags { get; set; }
    }
}