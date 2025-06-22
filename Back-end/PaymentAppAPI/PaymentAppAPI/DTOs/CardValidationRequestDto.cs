using System.ComponentModel.DataAnnotations;

namespace PaymentAppAPI.DTOs
{
    public class CardValidationRequestDto
    {
        [Required]
        [CreditCard] // Basic credit card format validation
        public required string CardNumber { get; set; }

        [Required]
        [Range(1, 12)]
        public int ExpiryMonth { get; set; }

        [Required]
        [Range(2025, 2035)] // Sensible range for expiry year
        public int ExpiryYear { get; set; }

        [Required]
        [RegularExpression(@"^\d{3,4}$", ErrorMessage = "Invalid CVV")]
        public required string Cvv { get; set; }
    }
}
