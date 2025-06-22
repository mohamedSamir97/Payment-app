namespace PaymentAppAPI.DTOs
{
    public class PaymentResponseDto
    {
        public required string TransactionId { get; set; }
        public required string Status { get; set; }
        public string? RefundCode { get; set; }
        public string? Message { get; set; }
    }
}
