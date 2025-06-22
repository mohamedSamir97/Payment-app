namespace PaymentAppAPI.DTOs
{
    public class PaymentReportDto
    {
        public required string TransactionId { get; set; }
        public decimal Amount { get; set; }
        public required string Status { get; set; }
        public DateTime TransactionDate { get; set; }
    }
}
