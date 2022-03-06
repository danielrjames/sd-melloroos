using Microsoft.Extensions.Caching.Distributed;
using System.Text.Json;

namespace api.Data
{
    public static class DistributedCacheExtensions
    {
        public static async Task<T?> GetRecordAsync<T>(this IDistributedCache cache, string key)
        {
            var jsonData = await cache.GetStringAsync(key);

            if (jsonData == null)
            {
                return default(T);
            }

            return JsonSerializer.Deserialize<T>(jsonData);
        }

        public static async Task SetRecordAsync<T>(this IDistributedCache cache, string key, T data)
        {
            var options = new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromDays(15)
            };

            var jsonData = JsonSerializer.Serialize(data);

            await cache.SetStringAsync(key, jsonData, options);
        }

        public static async Task RemoveRecordAsync(this IDistributedCache cache, string key)
        {
            await cache.RemoveAsync(key);
        }
    }
}
