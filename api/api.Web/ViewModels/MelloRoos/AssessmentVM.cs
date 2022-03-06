using api.Domain.Entities.MelloRoos;
using System.ComponentModel.DataAnnotations;

namespace api.Web.ViewModels.MelloRoos
{
    public class AssessmentVM
    {
        [Required]
        public double Total { get; set; }
        public List<FundVM> Funds { get; set; } = new List<FundVM>();

        public AssessmentVM(Assessment assessment)
        {
            Total = assessment.Total;
            Funds = assessment.Funds.Select(f => new FundVM(f)).ToList();
        }

        public AssessmentVM()
        {

        }
    }
}
