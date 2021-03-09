using API.classes;
using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class AppServiceExtension
    {
        public static IServiceCollection AddAppServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<DataContext>(options =>
           {
               options.UseSqlite(config.GetConnectionString("DefaultConnection"));
           });
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IMailService, MailService>();

            services.Configure<EmailConfig>(config.GetSection("EmailConfig"));
            return services;
        }
    }
}