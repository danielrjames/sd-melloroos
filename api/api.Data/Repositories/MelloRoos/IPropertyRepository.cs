using api.Domain.Entities.MelloRoos;

namespace api.Data.Repositories.MelloRoos
{
    public interface IPropertyRepository : IDisposable
    {
        Task<Property?> GetProperty(string address);
        Task<bool> AddOrUpdateProperty(Property property);
    }
}
