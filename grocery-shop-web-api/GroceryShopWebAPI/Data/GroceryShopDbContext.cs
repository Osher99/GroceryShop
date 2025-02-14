using GroceryShopWebAPI.Models;
using Microsoft.EntityFrameworkCore;

public class GroceryShopDbContext : DbContext
{
    public GroceryShopDbContext(DbContextOptions<GroceryShopDbContext> options)
        : base(options) { }

    public DbSet<FinanciaDayReport> FinanciaDayReports { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}