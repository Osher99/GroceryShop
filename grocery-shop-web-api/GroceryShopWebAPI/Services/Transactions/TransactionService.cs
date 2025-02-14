using GroceryShopWebAPI.Dtos;
using GroceryShopWebAPI.Models;
using GroceryShopWebAPI.Services.JsonBin;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.ComponentModel;
using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace GroceryShopWebAPI.Services.Transactions
{
    public class TransactionService : ITransactionService
    {
        private readonly GroceryShopDbContext _context;
        private readonly ILogger<TransactionService> _logger;
        private readonly IJsonBinService _jsonBinService;
       
        public TransactionService(GroceryShopDbContext context, ILogger<TransactionService> logger, IJsonBinService jsonBinService)
        {
            _context = context; // DB approach
            _logger = logger;
            _jsonBinService = jsonBinService; // Json approach
        }

        public async Task<PaginatedResult<FinanciaDayReport>> GetTransactionsAsync(DateTime startDate, DateTime endDate, int pageNumber, int pageSize)
        {
            try
            {
                _logger.LogInformation("Fetching transactions from {StartDate} to {EndDate} - Page {PageNumber}", startDate, endDate, pageNumber);

                // db aproach:
                //var query = _context.FinanciaDayReports
                //    .Where(t => t.Date >= startDate && t.Date <= endDate);

                //int totalItems = await query.CountAsync();
                //int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);

                //var transactions = await query
                //    .OrderBy(t => t.Date)
                //    .Skip((pageNumber - 1) * pageSize)
                //    .Take(pageSize)
                //    .ToListAsync();

                // json-online approach:

                var data = await _jsonBinService.GetTransactionsAsync();

                var itemList = data.Where(t => t.Date >= startDate && t.Date <= endDate).ToList();

                int totalItems = itemList.Count;
                int totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);

                var transactions = itemList
                    .OrderBy(t => t.Date)
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();

                return new PaginatedResult<FinanciaDayReport>
                {
                    Items = transactions,
                    TotalPages = totalPages,
                    CurrentPage = pageNumber,
                    PageSize = pageSize,
                    TotalItems = totalItems
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching transactions");
                return new PaginatedResult<FinanciaDayReport>();
            }
        }
    }
}