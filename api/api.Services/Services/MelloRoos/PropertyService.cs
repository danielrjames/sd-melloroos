using api.Data.Repositories.MelloRoos;
using api.Domain.Entities.MelloRoos;

namespace api.Services.Services.MelloRoos
{
    public class PropertyService : IPropertyService
    {
        private readonly IPropertyRepository _repo;

        public PropertyService(IPropertyRepository repo)
        {
            _repo = repo;
        }

        public async Task<Property?> GetProperty(string address)
        {
            if (string.IsNullOrEmpty(address))
            {
                return null;
            }

            return await _repo.GetProperty(address.ToUpper());
        }

        public async Task<bool> SaveProperty(Property property)
        {
            return await _repo.AddOrUpdateProperty(property);
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    _repo.Dispose();
                }
            }
            disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
