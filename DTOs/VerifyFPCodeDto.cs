using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class VerifyFPCodeDto
    {
        [Required]
        [RegularExpression(@"^[0-9]{6}$", ErrorMessage = "Invalid code provided")]

        public string code { get; set; }

        [Required]
        [EmailAddress]

        public string email { get; set; }
    }
}