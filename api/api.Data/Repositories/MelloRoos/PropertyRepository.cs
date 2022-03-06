using api.Data.Contexts;
using api.Domain.Entities.MelloRoos;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;

namespace api.Data.Repositories.MelloRoos
{
    public class PropertyRepository : IPropertyRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IDistributedCache _cache;

        public PropertyRepository(ApplicationDbContext context, IDistributedCache cache)
        {
            _context = context;
            _cache = cache;
        }

        public async Task<Property?> GetProperty(string address)
        {
            var cacheKey = new string(address.ToCharArray().Where(c => !char.IsWhiteSpace(c)).ToArray());

            var record = await _cache.GetRecordAsync<Property>(cacheKey);

            if (record != null)
            {
                return record;
            }

            var dbEntry = await _context.Properties.Select(p => new Property
            {
                Address = p.Address,
                Owner = p.Owner,
                Parcel = p.Parcel,
                RecordDate = p.RecordDate,
                Tax = new Tax
                {
                    LandValue = p.Tax.LandValue,
                    ImprovementValue = p.Tax.ImprovementValue,
                    NetValue = p.Tax.NetValue,
                    BaseTax = p.Tax.BaseTax,
                    Rate = p.Tax.Rate,
                    FixedCharges = p.Tax.FixedCharges,
                    TotalTax = p.Tax.TotalTax
                },
                Assessment = p.Assessment != null ? new Assessment
                {
                    Total = p.Assessment.Total,
                    Funds = p.Assessment.Funds.Select(f => new Fund
                    {
                        LineItem = f.LineItem,
                        Description = f.Description,
                        FundNumber = f.FundNumber,
                        Amount = f.Amount
                    }).OrderBy(f => f.LineItem).ToList()
                } : null
            }).FirstOrDefaultAsync(p => p.Address == address);

            if (dbEntry != null)
            {
                await _cache.SetRecordAsync(cacheKey, dbEntry);
            }

            return dbEntry;
        }

        public async Task<bool> AddOrUpdateProperty(Property property)
        {
            var dbEntry = await _context.Properties
                .Include(p => p.Tax)
                .Include(p => p.Assessment)
                .FirstOrDefaultAsync(p => p.Parcel == property.Parcel);

            if (dbEntry == null)
            {
                _context.Properties.Add(property);

                return await _context.SaveChangesAsync() > 0;
            }

            var cacheKey = new string(dbEntry.Address.ToCharArray().Where(c => !char.IsWhiteSpace(c)).ToArray());

            var record = await _cache.GetRecordAsync<Property>(cacheKey);

            if (record != null)
            {
                await _cache.RemoveRecordAsync(cacheKey);
            }

            dbEntry.Owner = property.Owner;
            dbEntry.RecordDate = property.RecordDate;

            dbEntry.Tax.LandValue = property.Tax.LandValue;
            dbEntry.Tax.ImprovementValue = property.Tax.ImprovementValue;
            dbEntry.Tax.NetValue = property.Tax.NetValue;
            dbEntry.Tax.BaseTax = property.Tax.BaseTax;
            dbEntry.Tax.Rate = property.Tax.Rate;
            dbEntry.Tax.FixedCharges = property.Tax.FixedCharges;
            dbEntry.Tax.TotalTax = property.Tax.TotalTax;

            if(dbEntry.Assessment != null && property.Assessment != null)
            {
                dbEntry.Assessment.Total = property.Assessment.Total;

                var removalFunds = dbEntry.Assessment.Funds.Where(existingFund => !property.Assessment.Funds.Any(newFund => newFund.FundNumber == existingFund.FundNumber));

                if (removalFunds.Any())
                {
                    _context.Funds.RemoveRange(removalFunds);
                }

                foreach (var newfund in property.Assessment.Funds)
                {
                    var existingFund = dbEntry.Assessment.Funds.FirstOrDefault(f => f.FundNumber == newfund.FundNumber);

                    if (existingFund == null)
                    {
                        newfund.AssessmentId = dbEntry.Assessment.Id;

                        _context.Funds.Add(newfund);
                    }
                    else
                    {
                        existingFund.LineItem = newfund.LineItem;
                        existingFund.Description = newfund.Description;
                        existingFund.Amount = newfund.Amount;
                    }
                }
            }
            else if (dbEntry.Assessment != null && property.Assessment == null)
            {
                _context.Assessments.Remove(dbEntry.Assessment);
            }
            else if (dbEntry.Assessment == null && property.Assessment != null)
            {
                property.Assessment.PropertyId = dbEntry.Id;

                _context.Assessments.Add(property.Assessment);
            }

            return await _context.SaveChangesAsync() > 0;
        }

        // GC
        private bool disposed = false;
        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
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
