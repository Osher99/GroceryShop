using GroceryShopWebAPI.Dtos;
using GroceryShopWebAPI.Models;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace GroceryShopWebAPI.Services.JsonBin
{
    public class JsonBinService : IJsonBinService
    {
        private readonly HttpClient _httpClient;
        private readonly string _jsonBinUrl;
        private readonly string _jsonBinKey;
        private readonly IMemoryCache _cache;
        private readonly ILogger<JsonBinService> _logger;

        public JsonBinService(HttpClient httpClient, IConfiguration configuration, IMemoryCache cache, ILogger<JsonBinService> logger)
        {
            _httpClient = httpClient;
            _jsonBinUrl = configuration["JsonBin:BaseUrl"];
            _jsonBinKey = configuration["JsonBin:MasterKey"];
            _cache = cache;
            _logger = logger;
        }

        public async Task<List<FinanciaDayReport>> GetTransactionsAsync()
        {
            if (_cache.TryGetValue("cachedTransactions", out List<FinanciaDayReport>? cachedTransactions))
            {
                _logger.LogInformation("Using cached transactions");
                return cachedTransactions!;
            }

            _logger.LogInformation("Fetching transactions from JSONBin...");
            var request = new HttpRequestMessage(HttpMethod.Get, _jsonBinUrl);
            request.Headers.Add("X-Master-Key", _jsonBinKey);

            var response = await _httpClient.SendAsync(request);
            response.EnsureSuccessStatusCode();

            var jsonResponse = await response.Content.ReadAsStringAsync();
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            options.Converters.Add(new DateTimeConverterFactory());

            var result = JsonSerializer.Deserialize<JsonBinResponse<FinanciaDayReport>>(jsonResponse, options);
            cachedTransactions = result?.Record ?? new List<FinanciaDayReport>();

            // שמירת הנתונים ב-Cache ל-5 דקות
            _cache.Set("cachedTransactions", cachedTransactions, TimeSpan.FromHours(8));

            return cachedTransactions;
        }

        private class DateTimeConverterFactory : JsonConverterFactory
        {
            public override bool CanConvert(Type typeToConvert) => typeToConvert == typeof(DateTime) || typeToConvert == typeof(DateTime?);

            public override JsonConverter CreateConverter(Type typeToConvert, JsonSerializerOptions options)
            {
                return new DateTimeConverter();
            }
        }

        private class DateTimeConverter : JsonConverter<DateTime>
        {
            private readonly string[] _formats = { "yyyy-MM-ddTHH:mm:ssZ", "yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd" };

            public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
            {
                string? dateString = reader.GetString();
                if (dateString != null && DateTime.TryParseExact(dateString, _formats, CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime date))
                {
                    return date;
                }
                throw new JsonException($"Invalid date format: {dateString}");
            }

            public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
            {
                writer.WriteStringValue(value.ToString("yyyy-MM-ddTHH:mm:ssZ"));
            }
        }
    }
}
