using Microsoft.EntityFrameworkCore;
using PaymentAppAPI.Data;
using PaymentAppAPI.Models;

namespace PaymentAppAPI.BackgroundServices
{
    public class ConfirmHeldPaymentsService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<ConfirmHeldPaymentsService> _logger;

        public ConfirmHeldPaymentsService(IServiceProvider serviceProvider, ILogger<ConfirmHeldPaymentsService> logger)
        {
            _serviceProvider = serviceProvider;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Confirm Held Payments Service is starting.");

            while (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogInformation("Confirm Held Payments Service is running.");

                await ConfirmPayments();

                // Run this check every hour.
                await Task.Delay(TimeSpan.FromHours(1), stoppingToken);
            }
        }

        private async Task ConfirmPayments()
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<PaymentDbContext>();
                _logger.LogInformation("Checking for held payments to confirm...");

                var paymentsToConfirm = await dbContext.Payments
                    .Where(p => p.Status == PaymentStatus.Held && DateTime.UtcNow > p.RefundCodeExpiry)
                    .ToListAsync();

                if (paymentsToConfirm.Any())
                {
                    foreach (var payment in paymentsToConfirm)
                    {
                        payment.Status = PaymentStatus.Confirmed;
                    }

                    await dbContext.SaveChangesAsync();
                    _logger.LogInformation($"Confirmed {paymentsToConfirm.Count} payments.");
                }
                else
                {
                    _logger.LogInformation("No payments to confirm at this time.");
                }
            }
        }
    }

}
