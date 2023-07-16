using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using POC.Data;
using POC.Helpers;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Cryptography;

public class Startup
{
    private readonly IConfiguration _configuration;

    public Startup(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        // Add DbContext for EmployeeContext
        services.AddDbContext<EmployeeContext>(options =>
            options.UseSqlServer(_configuration.GetConnectionString("DefaultConnection")));


        // Generate a secure secret key
        byte[] randomBytes = new byte[32]; // 32 bytes = 256 bits
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(randomBytes);
        }

        // Convert the byte array to a string representation (Base64 encoded)
        string secretKey = Convert.ToBase64String(randomBytes);
        const string issuer = "EmployeeManagerApp";
        const string audience = "EmployeeManagementAPI";

        // Set the secret key in the configuration
        _configuration["JwtSettings:SecretKey"] = secretKey;


        services.AddHttpContextAccessor();

        // Register dependencies
        services.AddScoped<JwtTokenGenerator>();
        services.AddScoped<EmployeeContext>();

        // Configure Authentication
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidIssuer = issuer,  
                    ValidAudience = audience, 
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))  
                };
            });

        // Add controllers and SwaggerGen
        services.AddControllers();
        services.AddSwaggerGen();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "API V1");
            });
        }
        else
        {
            // Add appropriate error handling and logging middleware for non-development environments
            app.UseExceptionHandler("/Error");
            app.UseHsts();
        }

        app.UseHttpsRedirection();
        app.UseRouting();
        app.UseAuthentication();
        app.UseAuthorization();
        app.UseStaticFiles();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}
