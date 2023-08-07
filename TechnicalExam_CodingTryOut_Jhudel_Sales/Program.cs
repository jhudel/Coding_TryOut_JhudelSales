using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace TechExam
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    // Use only HTTP
                    webBuilder.UseUrls("http://localhost:5113");
                    // OR
                    // Use only HTTPS
                    // webBuilder.UseUrls("https://localhost:7113");
                    webBuilder.UseStartup<Startup>();
                });
    }
}
