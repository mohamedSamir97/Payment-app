namespace PaymentAppAPI.DTOs
{
    public class CardBalanceReportDto
    {
        public required string LastFourDigits { get; set; }
        public decimal Balance { get; set; }
    }
}
