
using Microsoft.EntityFrameworkCore;
using backendTally.Data;
using backendTally.DTOs;
using BCrypt.Net;
using backendTally.Services;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddScoped<JwtService>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
 {
     options.TokenValidationParameters = new TokenValidationParameters
     {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)
        )
     };
 });

var allowedOrigins = new List<string> { "http://localhost:3000" };
var productionUrl = builder.Configuration["AppBaseUrl"];
if (!string.IsNullOrWhiteSpace(productionUrl) && productionUrl != "http://localhost:3000")
    allowedOrigins.Add(productionUrl);

builder.Services.AddCors(o =>
{
    o.AddPolicy("AllowFrontend", p => p
        .WithOrigins(allowedOrigins.ToArray())
        .AllowAnyHeader()
        .AllowAnyMethod());
});

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi

builder.Services.AddOpenApi();
builder.Services.AddDbContext<TallyDbContext>( options =>
options.UseNpgsql(Environment.GetEnvironmentVariable("DefaultConnection")
                ?? builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<AggregateService>();
builder.Services.AddScoped<BillPaymentService>();
builder.Services.AddScoped<EmailService>();
builder.Services.AddHostedService<AccountCleanupService>();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseCors("AllowFrontend");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();


