using System;

namespace DevilBlog.Dto.ManageDTOs
{
    public class UserDto
    {
        public string UserName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Address { get; set; }

        public string Avatar { get; set; }

        public DateTime? BirthDay { get; set; }

        public bool Status { get; set; }

        public bool Gender { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public string[] Roles { get; set; }
    }
}