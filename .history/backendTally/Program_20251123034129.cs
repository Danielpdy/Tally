
using Microsoft.EntityFrameworkCore;
using backendTally.Data;
using backendTally.DTOs;
using BCrypt.Net;
using backendTally.Services;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddCors(o =>
{
    o.AddPolicy("AllowFrontend", p => p
        .WithOrigins("http://localhost:3000") // Next dev
        .AllowAnyHeader()
        .AllowAnyMethod());
});

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi

builder.Services.AddOpenApi();
builder.Services.AddDbContext<TallyDbContext>( options =>
options.UseNpgsql(Environment.GetEnvironmentVariable("DefaultConnection")
                ?? builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<AggregateService>

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.MapControllers();
app.Run();


