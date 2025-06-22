using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PaymentAppAPI.Models
{
    public class Card
    {
        [Key]
        public Guid Id { get; set; }

        // In a real app, this should be tokenized or securely handled.
        // For this project, we'll store the last 4 digits for identification.
        [Required]
        [StringLength(4)]
        public required string LastFourDigits { get; set; }

        [Required]
        public int ExpiryMonth { get; set; }

        [Required]
        public int ExpiryYear { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Balance { get; set; }

        // Navigation property for related payments
        public ICollection<Payment> Payments { get; set; } = new List<Payment>();
    }
}
