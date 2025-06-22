using Microsoft.EntityFrameworkCore;
using PaymentAppAPI.Data;
using PaymentAppAPI.DTOs;
using PaymentAppAPI.Models;
using PaymentAppAPI.Services.Interfaces;
using System.Security.Cryptography;

namespace PaymentAppAPI.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly PaymentDbContext _context;

        public PaymentService(PaymentDbContext context)
        {
            _context = context;
        }

        public async Task<bool> ValidateCardAsync(CardValidationRequestDto cardDetails)
        {
            // 1. Luhn Algorithm Check
            if (!LuhnCheck(cardDetails.CardNumber))
            {
                return false;
            }

            // 2. Expiry Date Check
            var expiryDate = new DateTime(cardDetails.ExpiryYear, cardDetails.ExpiryMonth, 1).AddMonths(1).AddDays(-1);
            if (expiryDate < DateTime.UtcNow)
            {
                return false;
            }

            // 3. (Simulated) Check if card exists in our DB (in a real scenario, this would be more complex)
            var lastFourDigits = cardDetails.CardNumber.Length > 4 ? cardDetails.CardNumber.Substring(cardDetails.CardNumber.Length - 4) : cardDetails.CardNumber;
            var card = await _context.Cards.FirstOrDefaultAsync(c =>
                c.LastFourDigits == lastFourDigits &&
                c.ExpiryMonth == cardDetails.ExpiryMonth &&
                c.ExpiryYear == cardDetails.ExpiryYear);

            return card != null;
        }

        public async Task<PaymentResponseDto> ProcessPaymentAsync(PaymentRequestDto paymentDetails)
        {
            var validationDto = new CardValidationRequestDto
            {
                CardNumber = paymentDetails.CardNumber,
                ExpiryMonth = paymentDetails.ExpiryMonth,
                ExpiryYear = paymentDetails.ExpiryYear,
                Cvv = paymentDetails.Cvv
            };

            if (!await ValidateCardAsync(validationDto))
            {
                return new PaymentResponseDto { TransactionId = GenerateTransactionId(), Status = "Failed", Message = "Card validation failed." };
            }

            var lastFourDigits = paymentDetails.CardNumber.Substring(paymentDetails.CardNumber.Length - 4);
            var card = await _context.Cards.FirstOrDefaultAsync(c => c.LastFourDigits == lastFourDigits);

            if (card.Balance < paymentDetails.Amount)
            {
                return new PaymentResponseDto { TransactionId = GenerateTransactionId(), Status = "Failed", Message = "Insufficient funds." };
            }

            // Hold amount
            card.Balance -= paymentDetails.Amount;

            var payment = new Payment
            {
                TransactionId = GenerateTransactionId(),
                Amount = paymentDetails.Amount,
                Status = PaymentStatus.Held,
                RefundCode = GenerateRefundCode(),
                RefundCodeExpiry = DateTime.UtcNow.Date.AddDays(1).AddTicks(-1), // End of today
                TransactionDate = DateTime.UtcNow,
                CardId = card.Id
            };

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            return new PaymentResponseDto
            {
                TransactionId = payment.TransactionId,
                Status = payment.Status.ToString(),
                RefundCode = payment.RefundCode
            };
        }

        // --- Private Helper Methods ---

        private bool LuhnCheck(string cardNumber)
        {
            int sum = 0;
            bool alternate = false;
            for (int i = cardNumber.Length - 1; i >= 0; i--)
            {
                char[] c = cardNumber.ToCharArray();
                int n = int.Parse(c[i].ToString());

                if (alternate)
                {
                    n *= 2;
                    if (n > 9)
                    {
                        n = (n % 10) + 1;
                    }
                }
                sum += n;
                alternate = !alternate;
            }
            return (sum % 10 == 0);
        }

        private string GenerateTransactionId()
        {
            // Generates a 15-char alphanumeric string
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, 15)
                .Select(s => s[RandomNumberGenerator.GetInt32(s.Length)]).ToArray());
        }

        private string GenerateRefundCode()
        {
            // Generates a 4-digit numeric code
            return RandomNumberGenerator.GetInt32(1000, 9999).ToString();
        }
    }
}
