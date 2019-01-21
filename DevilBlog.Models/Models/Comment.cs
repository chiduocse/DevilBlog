using DevilBlog.Models.Abstract;
using System.Collections.Generic;

namespace DevilBlog.Models.Models
{
    public class Comment : AuditableEntity
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public Comment Parent { get; set; }
        public int? PostId { get; set; }
        public Post Post { get; set; }
        public string Content { get; set; }
    }
}