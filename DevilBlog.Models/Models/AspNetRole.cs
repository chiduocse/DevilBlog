using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using DevilBlog.Models.Abstract;

namespace DevilBlog.Models.Models
{
    public class AspNetRole : IdentityRole, IAuditableEntity
    {
        public string Description { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool Status { get; set; }

        /// <summary>
        /// Navigation property for the users in this role.
        /// </summary>
        public virtual ICollection<IdentityUserRole<string>> Users { get; set; }

        /// <summary>
        /// Navigation property for claims in this role.
        /// </summary>
        public virtual ICollection<IdentityRoleClaim<string>> Claims { get; set; }
    }
}