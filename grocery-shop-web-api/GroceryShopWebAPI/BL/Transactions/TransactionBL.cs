using GroceryShopWebAPI.Dtos;
using GroceryShopWebAPI.Models;
using GroceryShopWebAPI.Services.Transactions;

namespace GroceryShopWebAPI.BL.Transactions
{
    public class TransactionBL : ITransactionBL
    {
        private readonly ITransactionService _transactionService;

        public TransactionBL(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        public async Task<PaginatedResult<FinanciaDayReport>> GetTransactionsAsync(DateTime startDate, DateTime endDate, int pageNumber, int pageSize)
        {
            return await _transactionService.GetTransactionsAsync(startDate, endDate, pageNumber, pageSize);
        }
    }
}
