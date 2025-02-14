namespace GroceryShopWebAPI.Dtos
{
    public class JsonBinResponse<T>
    {
        public List<T> Record { get; set; }
    }
}
