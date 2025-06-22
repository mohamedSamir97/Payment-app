using System.ComponentModel.DataAnnotations;

namespace PaymentAppAPI.DTOs
{
    public class RefundRequestDto
    {
        [Required]
        public required string TransactionId { get; set; }

        [Required]
        [StringLength(4)]
        public required string RefundCode { get; set; }
    }
}
