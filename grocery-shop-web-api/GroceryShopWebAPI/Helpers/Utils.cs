using GroceryShopWebAPI.Models;

namespace GroceryShopWebAPI.Helpers
{
    public static class Utils
    {
        public static class DataSeeder
        {
            public static void SeedData(GroceryShopDbContext context)
            {
                if (!context.FinanciaDayReports.Any())
                {
                    var random = new Random();
                    var transactions = new List<FinanciaDayReport>();

                    for (int i = 0; i < 100; i++)
                    {
                        transactions.Add(new FinanciaDayReport
                        {
                            Id = Guid.NewGuid(),
                            Date = new DateTime(2023, random.Next(1, 13), random.Next(1, 28)),
                            Income = random.Next(100, 10000),
                            Outcome = random.Next(50, 5000)
                        });
                    }

                    context.FinanciaDayReports.AddRange(transactions);
                    context.SaveChanges();
                }
            }
        }
    }
}
