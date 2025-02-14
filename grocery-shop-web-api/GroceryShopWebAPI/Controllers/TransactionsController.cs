using GroceryShopWebAPI.BL.Transactions;
using Microsoft.AspNetCore.Mvc;


[ApiController]
[Route("api/[controller]")]
public class TransactionsController : ControllerBase
{
    private readonly ITransactionBL _transactionBL;

    public TransactionsController(ITransactionBL transactionBL)
    {
        _transactionBL = transactionBL;
    }

    [HttpGet]
    public async Task<IActionResult> GetTransactions([FromQuery] DateTime startDate, [FromQuery] DateTime endDate, [FromQuery] int pageNumber, [FromQuery] int pageSize)
    {
        var transactions = await _transactionBL.GetTransactionsAsync(startDate, endDate, pageNumber, pageSize);
        return Ok(transactions);
    }
}