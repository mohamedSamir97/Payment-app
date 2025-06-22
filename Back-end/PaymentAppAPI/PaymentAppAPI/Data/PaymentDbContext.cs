using Microsoft.EntityFrameworkCore;
using PaymentAppAPI.Models;

namespace PaymentAppAPI.Data
{
    public class PaymentDbContext : DbContext
    {
        public PaymentDbContext(DbContextOptions<PaymentDbContext> options) : base(options)
        {
        }

        public DbSet<Card> Cards { get; set; }
        public DbSet<Payment> Payments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure a unique index on TransactionId to ensure it's not repeated.
            modelBuilder.Entity<Payment>()
                .HasIndex(p => p.TransactionId)
                .IsUnique();

            // Seed some initial data for testing purposes (optional)
            var cardId = Guid.NewGuid();
            modelBuilder.Entity<Card>().HasData(
                new Card
                {
                    Id = cardId,
                    LastFourDigits = "1234",
                    ExpiryMonth = 12,
                    ExpiryYear = 2028,
                    Balance = 5000.00m
                }
            );
        }
    }
}
