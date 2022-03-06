using api.Domain.Entities.MelloRoos;
using System.ComponentModel.DataAnnotations;

namespace api.Web.ViewModels.MelloRoos
{
    public class FundVM
    {
        [Required]
        public double Amount { get; set; }
        [Required]
        public string Description { get; set; } = string.Empty;
        [Required]
        public int LineItem { get; set; }
        [Required]
        public int FundNumber { get; set; }

        public FundVM(Fund fund)
        {
            Amount = fund.Amount;
            Description = fund.Description;
            LineItem = fund.LineItem;
            FundNumber = fund.FundNumber;
        }

        public FundVM()
        {

        }
    }
}
