using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Director> Directors => Set<Director>();
    public DbSet<Movie> Movies => Set<Movie>();
}
