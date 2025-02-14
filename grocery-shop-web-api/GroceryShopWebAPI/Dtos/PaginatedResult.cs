namespace GroceryShopWebAPI.Dtos
{
    public class PaginatedResult<T>
    {
        public List<T> Items { get; set; } = new();
        public int TotalPages { get; set; }
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public int TotalItems { get; set; }
    }
}
