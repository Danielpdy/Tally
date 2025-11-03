
using Microsoft.EntityFrameworkCore;
using backendTally.Data;
using backendTally.DTOs;
using BCrypt.Net;


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
options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.

app.MapPost("/auth/signup", async (TallyDbContext db, SignupDto dto) =>
{
    // Hash password
    var hashedPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password);

    // Create user
    var user = new User
    {
        Email = dto.Email,
        Name = dto.Name,
        PasswordHash = hashedPassword
    };

    db.Users.Add(user);
    await db.SaveChangesAsync();

    return Results.Created($"/users/{user.Id}", new { user.Id, user.Email, user.Name });
});

app.MapPost("/auth/login", async (TallyDbContext db, LoginDto dto) =>
{
    var user = await db.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
    if (user is null) return Results.Unauthorized();

    // Verify password
    bool valid = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);
    if (!valid) return Results.Unauthorized();

    return Results.Ok(new { message = "Login successful" });
});


app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.MapControllers();
app.Run();


