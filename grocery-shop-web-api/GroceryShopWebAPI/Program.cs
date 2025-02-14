using GroceryShopWebAPI.BL.Transactions;
using GroceryShopWebAPI.Services.Transactions;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using static GroceryShopWebAPI.Helpers.Utils;
using GroceryShopWebAPI.Services.JsonBin;

var builder = WebApplication.CreateBuilder(args);
builder.WebHost.UseUrls("http://localhost:23247");

// DB APPROACH
//builder.Services.AddDbContext<GroceryShopDbContext>(options =>
//    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<ITransactionBL, TransactionBL>();
//builder.Services.AddScoped<ITransactionService, TransactionService>();
builder.Services.AddHttpClient<IJsonBinService, JsonBinService>();
builder.Services.AddScoped<ITransactionService, TransactionService>();
builder.Services.AddMemoryCache();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = false,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"]))
        };
    });
builder.Services.AddControllers();
builder.Services.AddAuthorization();
builder.Services.AddHttpClient();

var app = builder.Build();

app.MapControllers();
app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

// DB APPROACH
//using (var scope = app.Services.CreateScope())
//{
//    var dbContext = scope.ServiceProvider.GetRequiredService<GroceryShopDbContext>();
//    DataSeeder.SeedData(dbContext);
//}

app.Run();