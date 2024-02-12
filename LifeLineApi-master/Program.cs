using LifeLineApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<LifeLinedbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("lifeline")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigin",
        builder => builder.WithOrigins("http://localhost:3000", "http://localhost:5000")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});

builder.Services.AddMemoryCache();
builder.Services.AddDistributedMemoryCache();
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(option =>
    {
        option.ExpireTimeSpan = TimeSpan.FromMinutes(60);
        //Which is why I'd like to be able to make the distinction between LoginPath and AccessDeniedPath so that, when access is denied the user is directed to a Forbidden Access error page. If the user's session has expired but do have permission but need to re-authenticate I need the behavior to remain the same.
        //option.LoginPath = "/Account/Login";
        //option.AccessDeniedPath = "/Account/Login";
    });

builder.Services.AddSession(option =>
{
    option.IdleTimeout = TimeSpan.FromMinutes(5);
    //HttpOnly Cookie HttpOnly is a flag the website can specify about a cookie. In other words, the webserver tells your browser �Hey, here is a cookie, and you should treat is as HttpOnly�. An HttpOnly Cookie is not accessible by the JavaScript.
    option.Cookie.HttpOnly = true;

    //An essential cookie, also known as a strictly necessary cookie, is a cookie that is needed for the proper functioning of your website. For example, an essential cookie remembers a user�s log-in information 
    option.Cookie.IsEssential = true;
});

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowOrigin"); // Apply CORS policy

app.MapControllers();
app.UseStaticFiles();
app.UseAuthorization();
app.UseSession();

app.Run();
