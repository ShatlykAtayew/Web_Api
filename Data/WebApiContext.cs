using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Data {
    public class WebApiContext : DbContext {
        public WebApiContext(DbContextOptions<WebApiContext> options) : base (options) { }
        public DbSet<AnnouncementBoard> AnnouncementItems { get; set; }
    }
}