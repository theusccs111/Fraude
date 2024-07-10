using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Fraude.Web.Helpers
{
    public static class CorsHelper
    {
        public static void ConfigureCorsService(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddCors(o =>
                   o.AddPolicy(
                       "CorsPolicy",
                       builder =>
                       {
                           builder.WithOrigins(configuration["WebApplication:AllowOrigions"].Split(';'))
                               .AllowAnyMethod()
                               .AllowAnyHeader()
                               .AllowCredentials();
                       }));
        }
    }
}
