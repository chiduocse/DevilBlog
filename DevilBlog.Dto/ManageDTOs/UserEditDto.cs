using System.ComponentModel.DataAnnotations;

namespace DevilBlog.Dto.ManageDTOs
{
    public class UserEditDto : UserDto
    {
        public string CurrentPassword { get; set; }

        [MinLength(6, ErrorMessage = "New Password must be at least 6 characters")]
        public string NewPassword { get; set; }

        new private bool IsLockedOut { get; } //Hide base member
    }
}