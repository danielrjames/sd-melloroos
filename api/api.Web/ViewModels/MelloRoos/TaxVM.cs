using api.Domain.Entities.MelloRoos;
using System.ComponentModel.DataAnnotations;

namespace api.Web.ViewModels.MelloRoos
{
    public class TaxVM
    {
        [Required]
        public double BaseTax { get; set; }
        [Required]
        public double FixedCharges { get; set; }
        [Required]
        public double ImprovementValues { get; set; }
        [Required]
        public double LandValues { get; set; }
        [Required]
        public double LedgerValues { get; set; }
        [Required]
        public double NetValue { get; set; }
        [Required]
        public double Rate { get; set; }
        [Required]
        public double TotalTax { get; set; }

        public TaxVM(Tax tax)
        {
            BaseTax = tax.BaseTax;
            FixedCharges = tax.FixedCharges;
            ImprovementValues = tax.ImprovementValue;
            LandValues = tax.LandValue;
            NetValue = tax.NetValue;
            Rate = tax.Rate;
            TotalTax = tax.TotalTax;
        }

        public TaxVM()
        {

        }
    }
}
