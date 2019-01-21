using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using DevilBlog.Models.Abstract;
using Microsoft.AspNetCore.Identity;

namespace DevilBlog.Models.Models
{
    public class AspNetUser : IdentityUser, IAuditableEntity
    {
        public virtual string FullName
        {
            get
            {
                string fullName = FirstName +" "+ LastName;

                return fullName;
            }
        }

        public virtual string FriendlyName
        {
            get
            {
                string friendlyName = string.IsNullOrWhiteSpace(FullName) ? UserName : FullName;

                if (!string.IsNullOrWhiteSpace(JobTitle))
                    friendlyName = $"{JobTitle} {friendlyName}";

                return friendlyName;
            }
        }

        [MaxLength(256)]
        public string FirstName { get; set; }

        [MaxLength(256)]
        public string LastName { get; set; }

        public string JobTitle { get; set; }

        [MaxLength(256)]
        public string Address { get; set; }

        public string Avatar { get; set; }

        public DateTime? BirthDay { get; set; }

        public bool Status { get; set; }

        public bool Gender { get; set; }

        public string Configuration { get; set; }
        public bool IsEnabled { get; set; }

        public bool IsLockedOut => this.LockoutEnabled && this.LockoutEnd >= DateTimeOffset.UtcNow;

        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }


        /// <summary>
        /// Navigation property for the roles this user belongs to.
        /// </summary>
        public virtual ICollection<IdentityUserRole<string>> Roles { get; set; }

        /// <summary>
        /// Navigation property for the claims this user possesses.
        /// </summary>
        public virtual ICollection<IdentityUserClaim<string>> Claims { get; set; }

        public virtual ICollection<Post> Posts { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
    }
}