using System.ComponentModel.DataAnnotations;

namespace DevilBlog.Dto.ManageDTOs
{
    public class IndexDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }

        public bool IsEmailConfirmed { get; set; }
        public string Email { get; set; }

        [Phone]
        [Display(Name = "Phone number")]
        public string PhoneNumber { get; set; }
    }
}