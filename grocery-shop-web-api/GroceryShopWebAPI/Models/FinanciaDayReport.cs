using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace GroceryShopWebAPI.Models
{
    [Index(nameof(Date))]
    public class FinanciaDayReport
    {
        [Key]
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public decimal Income { get; set; }
        public decimal Outcome { get; set; }
    }
}
