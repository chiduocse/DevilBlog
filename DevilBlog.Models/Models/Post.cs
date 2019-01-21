using DevilBlog.Models.Abstract;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DevilBlog.Models.Models
{
    public class Post : AuditableEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { set; get; }

        [Required]
        [MaxLength(256)]
        public string Title { get; set; }

        [Required]
        [MaxLength(256)]
        public string Slug { set; get; }

        [MaxLength(256)]
        public string Image { set; get; }

        [MaxLength(500)]
        public string Description { set; get; }

        public string Content { set; get; }
        public bool Draft { get; set; }
        public DateTime PublishOn { get; set; }
        public bool Public { get; set; }
        public int ReadTime { get; set; }
        public bool? HomeFlag { set; get; }
        public bool? HotFlag { set; get; }
        public int? ViewCount { set; get; }
        public ICollection<Comment> Comments { get; set; }
        public ICollection<PostTopic> PostTopics { get; set; }
        public ICollection<PostTag> PostTags { get; set; }
    }
}