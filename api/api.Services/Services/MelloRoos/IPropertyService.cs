using api.Domain.Entities.MelloRoos;

namespace api.Services.Services.MelloRoos
{
    public interface IPropertyService : IDisposable
    {
        Task<Property?> GetProperty(string address);
        Task<bool> SaveProperty(Property property);
    }
}
