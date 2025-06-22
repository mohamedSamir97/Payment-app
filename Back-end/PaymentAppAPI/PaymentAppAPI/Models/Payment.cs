using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PaymentAppAPI.Models
{
    public class Payment
    {
        [Key]
        public Guid Id { get; set; }

        // This will be the publicly exposed Transaction ID
        [Required]
        [StringLength(20)]
        public required string TransactionId { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Amount { get; set; }

        [Required]
        public PaymentStatus Status { get; set; }

        // The 4-digit code for refunds, valid until midnight
        [StringLength(4)]
        public string? RefundCode { get; set; }

        public DateTime? RefundCodeExpiry { get; set; }

        [Required]
        public DateTime TransactionDate { get; set; }

        // Foreign Key for the Card
        public Guid CardId { get; set; }
        public Card? Card { get; set; }
    }
}
