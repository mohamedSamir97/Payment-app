using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PaymentAppAPI.Services.Interfaces;

namespace PaymentAppAPI.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ReportsController : ControllerBase
    {
        private readonly IPaymentService _paymentService;

        public ReportsController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpGet("payments")]
        public async Task<IActionResult> GetPaymentsReport(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? status = null,
            [FromQuery] DateTime? startDate = null,
            [FromQuery] DateTime? endDate = null)
        {
            var report = await _paymentService.GetPaymentsReportAsync(pageNumber, pageSize, status, startDate, endDate);
            return Ok(report);
        }

        [HttpGet("card-balances")]
        public async Task<IActionResult> GetCardBalancesReport(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? lastFourDigits = null)
        {
            var report = await _paymentService.GetCardBalancesReportAsync(pageNumber, pageSize, lastFourDigits);
            return Ok(report);
        }
    }
}
