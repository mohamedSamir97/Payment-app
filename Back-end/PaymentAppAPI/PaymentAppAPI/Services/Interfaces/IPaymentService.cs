using PaymentAppAPI.DTOs;

namespace PaymentAppAPI.Services.Interfaces
{
    public interface IPaymentService
    {
        Task<bool> ValidateCardAsync(CardValidationRequestDto cardDetails);
        Task<PaymentResponseDto> ProcessPaymentAsync(PaymentRequestDto paymentDetails);
    }
}
