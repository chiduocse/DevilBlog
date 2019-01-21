using System;
using System.ComponentModel.DataAnnotations;
using DevilBlog.Models.Models;

namespace DevilBlog.Models.Abstract
{
    public abstract class AuditableEntity : IAuditableEntity
    {
        [Required]
        [MaxLength(450)]
        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool Status { get; set; }
    }
}