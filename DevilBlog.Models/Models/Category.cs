using DevilBlog.Models.Abstract;

namespace DevilBlog.Models.Models
{
    public class Category : AuditableEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool ShowOnHomePage { get; set; }
    }
}