using GroceryShopWebAPI.Dtos;
using GroceryShopWebAPI.Models;

namespace GroceryShopWebAPI.BL.Transactions
{
    public interface ITransactionBL
    {
        Task<PaginatedResult<FinanciaDayReport>> GetTransactionsAsync(DateTime startDate, DateTime endDate, int pageNumber, int pageSize);
    }
}
