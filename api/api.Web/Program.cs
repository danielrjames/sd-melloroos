using api.Data.Contexts;
using api.Data.Repositories.Auth;
using api.Data.Repositories.Property;
using api.Domain.Entities.Auth;
using api.Domain.Entities.User;
using api.Services.Services.Auth;
using api.Services.Services.Email;
using api.Web.Helpers.Middleware;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// add env variables

var corsDefault = "default";

var postgresConnectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING") ?? builder.Configuration.GetConnectionString("PostgresConnection");
var redisConnectionString = Environment.GetEnvironmentVariable("CACHE_CONNECTION_STRING") ?? builder.Configuration.GetConnectionString("RedisConnection");

var tokenKey = Environment.GetEnvironmentVariable("TOKEN_KEY") ?? builder.Configuration.GetSection("Tokens")["Key"];
var tokenIssuer = Environment.GetEnvironmentVariable("TOKEN_ISSUER") ?? builder.Configuration.GetSection("Tokens")["Issuer"];
var tokenAudience = Environment.GetEnvironmentVariable("TOKEN_AUDIENCE") ?? builder.Configuration.GetSection("Tokens")["Audience"];

// add services to the container.

builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(postgresConnectionString));
builder.Services.AddStackExchangeRedisCache(options => options.Configuration = redisConnectionString);

builder.Services
    .AddIdentity<ApplicationUser, ApplicationRole>(options =>
    {
        // password settings
        options.Password.RequireDigit = true;
        options.Password.RequiredLength = 8;
        options.Password.RequireNonAlphanumeric = true;
        options.Password.RequireUppercase = true;
        options.Password.RequireLowercase = true;
        options.Password.RequiredUniqueChars = 2;

        // lockout settings
        options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
        options.Lockout.MaxFailedAccessAttempts = 5;
        options.Lockout.AllowedForNewUsers = true;

        // user settings
        options.User.RequireUniqueEmail = true;
    })
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = Convert.ToBoolean(builder.Configuration.GetSection("Tokens")["HttpsMeta"]);
        options.SaveToken = false;
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            RequireSignedTokens = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey)),
            ValidateIssuerSigningKey = true,
            ValidAudience = tokenAudience,
            ValidateAudience = true,
            ValidIssuer = tokenIssuer,
            ValidateIssuer = true,
            ValidateLifetime = true,
            RequireExpirationTime = true,
            ClockSkew = TimeSpan.Zero
        };
    });

//builder.Services.AddAuthorization(options =>
//{
//    options.AddPolicy("policyName", policy => policy.RequireClaim("claimName", "claimValue"));
//});

builder.Services
    .AddCors(options =>
    {
        options.AddPolicy(corsDefault,
            bldr => bldr
            .WithOrigins(tokenAudience)
            .AllowAnyMethod()
            .AllowAnyHeader()
        );
    });

builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
        options.JsonSerializerOptions.WriteIndented = true;
    });

// app services

builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IEmailService, EmailService>();

// app repositories

builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<IPropertyRepository, PropertyRepository>();

// config

builder.Services.Configure<TokenConfig>(tokenConfig =>
{
    tokenConfig.Key = tokenKey;
    tokenConfig.Issuer = tokenIssuer;
    tokenConfig.Audience = tokenAudience;
    tokenConfig.JwtExpiration = Convert.ToInt32(builder.Configuration.GetSection("Tokens")["JwtExpiration"]);
    tokenConfig.RefreshExpiration = Convert.ToInt32(builder.Configuration.GetSection("Tokens")["RefreshExpiration"]);
    tokenConfig.RememberMeExpiration = Convert.ToInt32(builder.Configuration.GetSection("Tokens")["RememberMeExpiration"]);
});

// http request pipeline.

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseForwardedHeaders(new ForwardedHeadersOptions
    {
        ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
    });
}

app.UseCors(corsDefault);

app.UseMiddleware<ErrorHandlerMiddleware>(app.Environment.IsProduction());

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
