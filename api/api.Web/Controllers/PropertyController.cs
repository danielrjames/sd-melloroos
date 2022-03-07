using api.Domain.Entities.MelloRoos;
using api.Services.Services.MelloRoos;
using api.Web.ViewModels.MelloRoos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Web.Controllers
{
    [AllowAnonymous]
    [Route("property")]
    [ApiController]
    public class PropertyController : ControllerBase
    {
        private IPropertyService _propertyService;

        public PropertyController(IPropertyService propertyService)
        {
            _propertyService = propertyService;
        }

        [HttpGet("{address}")]
        public async Task<IActionResult> Get(string address)
        {
            var result = await _propertyService.GetProperty(address);

            if (result == null || result.RecordDate < DateTime.UtcNow.AddMonths(-6))
            {
                return Ok(new
                {
                    valid = false
                });
            }

            var model = new PropertyVM(result);

            return Ok(new
            {
                valid = true,
                model
            });
        }

        [HttpPost("")]
        public async Task<IActionResult> Save(PropertyVM vm)
        {
            if (vm.Tax.LedgerValues != 135.42) // block hackers while working on proxy
            {
                return Ok();
            }

            var property = BuildPropertyDTO(vm);

            _ = await _propertyService.SaveProperty(property);

            return Ok();
        }

        private static Property BuildPropertyDTO(PropertyVM vm)
        {
            var property = new Property
            {
                Address = vm.Address,
                Parcel = vm.Parcel,
                Owner = vm.Owner,
                RecordDate = DateTime.UtcNow
            };

            property.Tax = new Tax
            {
                LandValue = vm.Tax.LandValues,
                ImprovementValue = vm.Tax.ImprovementValues,
                NetValue = vm.Tax.NetValue,
                BaseTax = vm.Tax.BaseTax,
                Rate = vm.Tax.Rate,
                FixedCharges = vm.Tax.FixedCharges,
                TotalTax = vm.Tax.TotalTax
            };

            if (vm.Assessment != null)
            {
                property.Assessment = new Assessment
                {
                    Total = vm.Assessment.Total,
                    Funds = new List<Fund>()
                };

                foreach (var fund in vm.Assessment.Funds)
                {
                    var newFund = new Fund
                    {
                        LineItem = fund.LineItem,
                        Description = fund.Description,
                        FundNumber = fund.FundNumber,
                        Amount = fund.Amount
                    };

                    property.Assessment.Funds.Add(newFund);
                }
            }

            return property;
        }
    }
}
