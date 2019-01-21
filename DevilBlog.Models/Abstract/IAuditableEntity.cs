using System;

namespace DevilBlog.Models.Abstract
{
    public interface IAuditableEntity
    {
        string CreatedBy { get; set; }
        string UpdatedBy { get; set; }
        DateTime CreatedDate { set; get; }
        DateTime UpdatedDate { set; get; }
        bool Status { set; get; }
    }
}