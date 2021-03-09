using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class FPCodeGenDto
    {
        [Required]
        [EmailAddress]

        public string email { get; set; }
    }
}