using GroceryShopWebAPI.Dtos;
using GroceryShopWebAPI.Models;

namespace GroceryShopWebAPI.Services.Transactions
{
    public interface ITransactionService
    {
        Task<PaginatedResult<FinanciaDayReport>> GetTransactionsAsync(DateTime startDate, DateTime endDate, int pageNumber, int pageSize);
    }

}
