using GroceryShopWebAPI.Models;

namespace GroceryShopWebAPI.Services.JsonBin
{
    public interface IJsonBinService
    {
        Task<List<FinanciaDayReport>> GetTransactionsAsync();
    }
}
