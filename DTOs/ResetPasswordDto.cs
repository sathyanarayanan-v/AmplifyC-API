using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class ResetPasswordDto
    {
        [Required]
        public string pwd { get; set; }

        [Required]
        public string cnfrmPwd { get; set; }

    }
}