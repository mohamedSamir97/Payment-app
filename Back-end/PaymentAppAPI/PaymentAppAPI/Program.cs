using Microsoft.EntityFrameworkCore;
using PaymentAppAPI.Data;
using PaymentAppAPI.Services.Interfaces;
using PaymentAppAPI.Services;
using PaymentAppAPI.BackgroundServices;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 1. Get the connection string
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// 2. Add the DbContext
builder.Services.AddDbContext<PaymentDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddScoped<IPaymentService, PaymentService>();

// Register the background service
builder.Services.AddHostedService<ConfirmHeldPaymentsService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
