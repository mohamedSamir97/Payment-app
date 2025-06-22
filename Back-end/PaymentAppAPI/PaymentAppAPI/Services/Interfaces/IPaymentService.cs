using PaymentAppAPI.DTOs;

namespace PaymentAppAPI.Services.Interfaces
{
    public interface IPaymentService
    {
        Task<bool> ValidateCardAsync(CardValidationRequestDto cardDetails);
        Task<PaymentResponseDto> ProcessPaymentAsync(PaymentRequestDto paymentDetails);
        Task<PaymentResponseDto> ProcessRefundAsync(RefundRequestDto refundDetails);
        Task<PaginatedResponseDto<PaymentReportDto>> GetPaymentsReportAsync(int pageNumber, int pageSize, string? status, DateTime? startDate, DateTime? endDate);
        Task<PaginatedResponseDto<CardBalanceReportDto>> GetCardBalancesReportAsync(int pageNumber, int pageSize, string? lastFourDigits);
    }
}
