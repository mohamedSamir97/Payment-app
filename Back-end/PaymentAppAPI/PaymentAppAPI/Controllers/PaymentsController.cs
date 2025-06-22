using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PaymentAppAPI.DTOs;
using PaymentAppAPI.Services.Interfaces;

namespace PaymentAppAPI.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class PaymentsController : ControllerBase
    {
        private readonly IPaymentService _paymentService;

        public PaymentsController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpPost("validate")]
        public async Task<IActionResult> ValidateCard([FromBody] CardValidationRequestDto cardDetails)
        {
            var isValid = await _paymentService.ValidateCardAsync(cardDetails);
            if (!isValid)
            {
                return BadRequest(new { isValid = false, message = "Invalid card details." });
            }
            return Ok(new { isValid = true, message = "Card is valid." });
        }

        [HttpPost]
        public async Task<IActionResult> ProcessPayment([FromBody] PaymentRequestDto paymentDetails)
        {
            var response = await _paymentService.ProcessPaymentAsync(paymentDetails);
            if (response.Status == "Failed")
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpPost("refund")]
        public async Task<IActionResult> RefundPayment([FromBody] RefundRequestDto refundDetails)
        {
            var response = await _paymentService.ProcessRefundAsync(refundDetails);
            if (response.Status == "Failed")
            {
                return BadRequest(response);
            }
            return Ok(response);
        }
    }
}
